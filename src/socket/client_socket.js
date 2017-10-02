import io from 'socket.io-client'
import {store} from '../index'
import {receiveMessage} from '../actions/index'

export default function createSocket() {
  var socket = io.connect('localhost:6680')
  socket.on('room message', (message) => store.dispatch(receiveMessage(message)))
  //TODO: Remove autojoin
  socket.emit('change name', 'Joni')
  socket.emit('join channel', 'foo')
  socket.emit('join channel', 'bar')
  socket.emit('join channel', 'baz')
  console.log('created socket', socket)
  return socket
}
