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
    socket.join(channel)
    socket.emit('joined channel', channelFor(channel))
    socket.to(channel).emit('user joined channel', stampOutgoing({channel}, socket.id))
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
  socket.on('change name', (name) => {
    if (users[name])
      socket.emit('name error', 'name already taken')
    else {
      users.delete(userFor(socket.id))
      users[name] = socket.id
      socket.emit('changed name', userFor(socket.id))
    }
  })
  socket.on('private message', (message) => {
    socket.to(target).emit('private message', message)
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
  return {name: channel, users: Object.keys(io.in(channel).sockets).map((socket) => userFor(socket))}
}

console.log("Listening on port 6680")
