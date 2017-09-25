import express from 'express'
import http from 'http'
import socketio from 'socket.io'

var app = express();
var server = http.Server(app);
var io = socketio(server);

server.listen(6680);

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/src/index.html');
});
