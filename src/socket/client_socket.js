import _ from 'lodash'
import io from 'socket.io-client'

import {store} from '../index'
import {receiveMessage, addChannel, newChannelUser} from '../actions/index'

export default function createSocket() {
  var socket = io.connect('localhost:6680')
  socket.on('room message', (message) => store.dispatch(receiveMessage(message)))
  socket.on('joined channel', (channel) => store.dispatch(addChannel(channel)))
  socket.on('new channel user', (payload) => store.dispatch(newChannelUser(payload)))
  //TODO: Remove autojoin
  socket.emit('change name', randomName())
  socket.emit('join channel', 'foo')
  socket.emit('join channel', 'bar')
  socket.emit('join channel', 'baz')
  console.log('created socket', socket)
  return socket
}

function randomName() {
  return _.sample(["Joni", "Kati", "Öllerö", "Pou", "Mou", "Jee"])
}
