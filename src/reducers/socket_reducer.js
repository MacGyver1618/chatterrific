import io from 'socket.io-client'

var placeholder = {
  socket: io.connect('localhost:6680')
}

export default (state = placeholder, action) => state
