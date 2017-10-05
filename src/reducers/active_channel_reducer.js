import _ from 'lodash'
import {store} from '../index'

var placeholder = {
  name: "",
  users: [],
  messages: []
}

function chatMessage(payload) {
  return {
    ...payload,
    type: 'CHAT_MESSAGE'
  }
}

function joinMessage(payload) {
  return {
    ...payload,
    type: 'NOTIFICATION_MESSAGE',
    message: payload.from.name + " joined channel " + payload.channel
  }
}

function partMessage(payload) {
  return {
    ...payload,
    type: 'NOTIFICATION_MESSAGE',
    message: payload.from.name + " left channel " + payload.channel
  }
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
    case 'NEW_CHANNEL_USER':
      if (action.payload.channel === channel.name)
        return {
          ...channel,
          users: [...channel.users, action.payload.from],
          messages: [...channel.messages, joinMessage(action.payload)]
        }
    case 'USER_LEFT_CHANNEL':
      if (action.payload.channel === channel.name)
        return {
          ...channel,
          users: channel.users.filter((user) => user.id !== action.payload.from.id),
          messages: [...channel.messages, partMessage(action.payload)]
        }
    case 'RECEIVE_MESSAGE':
      if (action.message.channel === channel.name)
        return {...channel, messages: [...channel.messages, chatMessage(action.message)]}
    default:
      return channel
  }
}
