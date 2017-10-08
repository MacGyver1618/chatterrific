import createSocket from '../socket/client_socket'

var placeholder = createSocket()

export default (socket = placeholder, action) => {
  switch (action.type) {
    case 'SELECT_USER_NAME':
      socket.emit('select name', action.name)
      break
    case 'JOIN_CHANNEL':
      socket.emit('join channel', action.channel)
      break
    case 'LEAVE_CHAT':
      if (action.chat.type == 'CHANNEL')
        socket.emit('leave channel', action.chat.name)
      break
    case 'POST_MESSAGE':
      switch (action.payload.chat.type) {
        case 'CHANNEL':
          socket.emit('channel message', {message: action.payload.message, channel: action.payload.chat.name})
          break
        case 'PRIVATE':
          socket.emit('private message', {message: action.payload.message, to: action.payload.chat.user})
          break
        }
      break
  }
  return socket
}
