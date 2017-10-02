import createSocket from '../socket/client_socket'

var placeholder = createSocket()

export default (socket = placeholder, action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      socket.emit('room message', action.payload)
  }
  return socket
}
