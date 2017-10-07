import createSocket from '../socket/client_socket'

var placeholder = createSocket()

export default (socket = placeholder, action) => {
  switch (action.type) {
    case 'JOIN_CHANNEL':
      socket.emit('join channel', action.channel)
      break
    case 'LEAVE_CHAT':
      if (action.chat.type == 'CHANNEL')
        socket.emit('leave channel', action.chat.name)
      break
    case 'POST_MESSAGE':
      socket.emit('channel message', {message: action.payload.message, channel: action.payload.chat.name})
      break
  }
  return socket
}
