import _ from 'lodash'
import {store} from '../index'

var placeholder = {
  name: "",
  users: [],
  messages: []
}

export default (channel = placeholder, action) => {
  switch(action.type) {
    case 'JOINED_CHANNEL':
    case 'SELECT_CHANNEL':
      return action.channel
    case 'LEAVE_CHANNEL':
      //TODO: return last channel in list
      if (action.channel === channel.name)
        return placeholder
    case 'USER_LEFT_CHANNEL':
      if (action.payload.channel === channel.name)
        return {...channel, users: channel.users.filter((user) => user.id !== action.payload.user.id)}
    case 'NEW_CHANNEL_USER':
      if (action.payload.channel === channel.name)
        return {...channel, users: [...channel.users, action.payload.user]}
    case 'RECEIVE_MESSAGE':
      if (action.message.room === channel.name)
        return {...channel, messages: [...channel.messages, action.message]}
    default:
      return channel
  }
}
