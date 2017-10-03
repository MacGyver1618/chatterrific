import {store} from '../index'

var placeholder = {
  name: "",
  users: [],
  messages: []
}

export default (channel = placeholder, action) => {
  switch(action.type) {
    case 'ADD_CHANNEL':
    case 'SELECT_CHANNEL':
      return action.channel
    case 'NEW_CHANNEL_USER':
      if (action.payload.channel === channel.name)
        return {...channel, users: [...channel.users, action.payload.user]}
      return channel
    case 'RECEIVE_MESSAGE':
      if (action.message.room === channel.name)
        return {...channel, messages: [...channel.messages, action.message]}
      return channel
    default:
      return channel
  }
}
