var app = require('express')()
var server = require('http').Server(app)
var io = require('socket.io')(server)
var _ = require('lodash')

var users = {}

server.listen(6680)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

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
    console.log("received room message to room ", message.room )
    io.in(message.room).emit('room message', message)
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

console.log("Listening on port 6680")
