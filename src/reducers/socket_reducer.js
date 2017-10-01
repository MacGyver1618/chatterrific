import io from 'socket.io-client'

var placeholder = {
  //TODO parametrize URL
  socket: io.connect('localhost:6680')
}

export default (state = placeholder, action) => state
