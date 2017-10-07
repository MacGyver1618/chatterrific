import { combineReducers } from 'redux'
import chats from './chats_reducer'
import socket from './socket_reducer'
import user from './user_reducer'

export default combineReducers({
  chats,
  user,
  socket
})
