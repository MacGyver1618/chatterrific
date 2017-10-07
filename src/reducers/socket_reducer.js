import createSocket from '../socket/client_socket'

var placeholder = createSocket()

export default (socket = placeholder, action) => {
  console.log("reducing socket")
  console.log("socket:", socket)
  console.log("action:", action)
  switch (action.type) {
    case 'JOIN_CHANNEL':
      socket.emit('join channel', action.channel)
      break
    case 'LEAVE_CHANNEL':
      socket.emit('leave channel', action.channel)
      break
    case 'POST_MESSAGE':
      socket.emit('channel message', {message: action.payload.message, channel: action.payload.chat.name})
      break
  }
  return socket
}
