import { combineReducers } from 'redux'
import channels from './channel_reducer'
import activeChannel from './active_channel_reducer'
import socket from './socket_reducer'
import user from './user_reducer'

export default combineReducers({
  channels,
  activeChannel,
  user,
  socket
})
