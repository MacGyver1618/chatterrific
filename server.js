var express = require('express')
var http = require('http')
var socketIo = require('socket.io')
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
  console.log(socket.id, "connected")
  socket.on('disconnecting', (reason) => {
    var user = userFor(socket.id)
    Object.keys(socket.rooms).forEach((room) => {
      socket.to(room).emit('left channel', {channel: room, user})
    })
    users.delete(user)
    console.log(socket.id, "disconnected", "(" + reason + ")")
  })
  socket.on('join channel', (channel) => {
    socket.join(channel)
    console.log(userFor(socket.id), "joined channel", channel)
    socket.emit('joined channel', channelFor(channel))
    socket.to(channel).emit('new channel user', {channel, user: userFor(socket.id)})
  })
  socket.on('leave channel', (channel) => {
    socket.leave(channel)
    console.log(userFor(socket.id), "joined channel", channel)
    io.in(channel).emit('left channel', {user: userFor(socket.id), channel})
  })
  socket.on('room message', (message) => {
    console.log("received room message", message.message, "to room", message.room )
    io.in(message.room).emit('room message', {message: message.message, room: message.room, timestamp: new Date(), user: userFor(socket.id)})
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
    // if user doesn't exist then error
    console.log("reiceived private message ", message)
    var target = users[message.user]
    console.log("socket is ", target, " ", socket.to(target).id)
    socket.to(target).emit('private message', message)
  })
})

function userFor(socketId) {
  var name = _.findKey(users, (value) => value === socketId)
  return {name, id: socketId}
}

function channelFor(channel) {
  return {name: channel, users: Object.keys(io.in(channel).sockets).map((socket) => userFor(socket))}
}

console.log("Listening on port 6680")
