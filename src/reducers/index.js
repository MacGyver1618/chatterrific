import { combineReducers } from 'react-redux'
import channels from 'channel_reducer'
import user from 'user_reducer'

export default combineReducers({
  channels,
  user
})
