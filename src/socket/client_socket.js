import _ from 'lodash'
import io from 'socket.io-client'

import {store} from '../index'
import {receiveMessage, addChannel, newChannelUser, gotNewName, userLeftChannel} from '../actions/index'

export default function createSocket() {
  var socket = io.connect('http://192.168.0.108:6680')
  socket.on('room message', (message) => store.dispatch(receiveMessage(message)))
  socket.on('joined channel', (channel) => store.dispatch(addChannel(channel)))
  socket.on('new channel user', (payload) => store.dispatch(newChannelUser(payload)))
  socket.on('changed name', (user) => store.dispatch(gotNewName(user)))
  socket.on('left channel', (payload) => store.dispatch(userLeftChannel(payload)))
  //TODO: Remove autoname
  socket.emit('change name', randomName())
  return socket
}

function randomName() {
  return _.sample(["Joni", "Kati", "Öllerö", "Pou", "Mou", "Jee"])
}
