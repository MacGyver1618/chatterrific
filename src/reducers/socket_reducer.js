import io from 'socket.io-client'

var placeholder = io.connect('localhost:6680')

export default (socket = placeholder, action) => {
  switch (action.type) {
    case 'POST_MESSAGE':
      socket.emit('room message', {
        room: "foo",
        message: "hiya"
      })
  }
  return socket
}
