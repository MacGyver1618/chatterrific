var express = require('express')
var http = require('http')
var socketIo = require('socket.io')
var _ = require('lodash')
var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackConfig = require('./webpack.config.js')

var users = {}
var app = express()
var server = http.Server(app)
var io = socketIo(server)

app.use(express.static(__dirname + '/public'))
app.use(webpackDevMiddleware(webpack(webpackConfig)))

server.listen(6680)

io.on('connection', (socket) => {
  console.log("connected on ", socket.id)
  socket.on('message', (message) => {
    console.log(message)
  })
  socket.on('disconnect', (socket) => {
    console.log(socket.id, " disconnected")
  })
  socket.on('pong', (socket) => {
    console.log("received ping from ", socket.id)
  })
  socket.on('join channel', (channel) => {
    socket.join(channel)
    console.log(socket.id, " joined channel ", channel)
  })
  socket.on('leave channel', (channel) => {
    socket.leave(channel)
  })
  socket.on('room message', (message) => {
    console.log("received room message", message.message, "to room", message.room )
    io.in(message.room).emit('room message', {message: message.message, room: message.room, timestamp: new Date(), user: userFor(socket)})
  })
  socket.on('change name', (name) => {
    // if exists then return error else change and store name
    users[name] = socket.id
    console.log(users)
  })
  socket.on('private message', (message) => {
    // if user doesn't exist then error
    console.log("reiceived private message ", message)
    var target = users[message.user]
    console.log("socket is ", target, " ", socket.to(target).id)
    socket.to(target).emit('private message', message)
  })
})

function userFor(socket) {
  return _.findKey(users, (value) => value === socket.id)
}

console.log("Listening on port 6680")
