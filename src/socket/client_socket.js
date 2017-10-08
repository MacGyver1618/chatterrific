import _ from 'lodash'
import io from 'socket.io-client'

import {store} from '../index'
import {
  newChannelMessage,
  joinedChannel,
  gotNewName,
  nameAlreadyTaken,
  userJoinedChannel,
  userLeftChannel,
  userDisconnected,
  newPrivateMessage,
  privateMessageEcho
} from '../actions/index'

export default function createSocket() {
  var socket = io.connect('http://192.168.0.108:6680')
  socket.on('name taken', (name) => store.dispatch(nameAlreadyTaken(name)))
  socket.on('name accepted', (user) => store.dispatch(gotNewName(user)))
  socket.on('channel message', (message) => store.dispatch(newChannelMessage(message)))
  socket.on('private message', (message) => store.dispatch(newPrivateMessage(message)))
  socket.on('private message echo', (message) => store.dispatch(privateMessageEcho(message)))
  socket.on('joined channel', (channel) => store.dispatch(joinedChannel(channel)))
  socket.on('user joined channel', (payload) => store.dispatch(userJoinedChannel(payload)))
  socket.on('user left channel', (payload) => store.dispatch(userLeftChannel(payload)))
  socket.on('user disconnected', (payload) => store.dispatch(userDisconnected(payload)))
  return socket
}
