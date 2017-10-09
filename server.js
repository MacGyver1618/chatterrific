var express = require('express')
var http = require('http')
var socketIo = require('socket.io')
var uuid = require('uuid/v4')
var _ = require('lodash')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackConfig = require('./webpack.config.js')

var users = new Map()
var app = express()
var server = http.Server(app)
var io = socketIo(server)

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))

server.listen(6680)

io.on('connection', (socket) => {
  socket.on('disconnecting', (reason) => {
    var user = userFor(socket.id)
    Object.keys(socket.rooms).forEach((room) => {
      socket.to(room).emit('user disconnected', stampOutgoing({channel: room}, socket.id))
    })
    users.delete(user)
  })
  socket.on('join channel', (channel) => {
    var alreadyThere = Object.keys(socket.rooms).includes(channel)
    socket.join(channel, () => {
      socket.emit('joined channel', channelFor(channel))
      if (!alreadyThere)
        socket.to(channel).emit('user joined channel', stampOutgoing({channel}, socket.id))
    })
  })
  socket.on('leave channel', (channel) => {
    socket.leave(channel)
    io.to(channel).emit('user left channel', stampOutgoing({channel}, socket.id))
  })
  socket.on('channel message', (message) => {
    io.to(message.channel).emit('channel message', stampOutgoing({
      message: message.message,
      channel: message.channel
    }, socket.id))
  })
  socket.on('select name', (name) => {
    if (users[name])
      socket.emit('name taken', name)
    else {
      users.delete(userFor(socket.id))
      users[name] = socket.id
      socket.emit('name accepted', userFor(socket.id))
    }
  })
  socket.on('private message', (message) => {
    var outgoing = stampOutgoing({
      to: message.to,
      message: message.message
    }, socket.id)
    socket.emit('private message echo', outgoing)
    socket.to(message.to.id).emit('private message', outgoing)
  })
})

function stampOutgoing(payload, socketId) {
  return Object.assign(payload, {from: userFor(socketId), timestamp: new Date(), id: uuid()})
}

function userFor(socketId) {
  var name = _.findKey(users, (value) => value === socketId)
  return {name, id: socketId}
}

function channelFor(channel) {
  return {name: channel, users: usersInChannel(channel)}
}

function usersInChannel(channel) {
  var sockets = io.to(channel).sockets
  return Object.keys(sockets)
    .filter((socketId) => socketInChannel(sockets[socketId], channel))
    .map((socketId) => userFor(socketId))
}

function socketInChannel(socket, channel) {
  return Object.keys(socket.rooms).includes(channel)
}

console.log("Listening on port 6680")
