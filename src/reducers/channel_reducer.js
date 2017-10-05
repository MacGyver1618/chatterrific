import _ from 'lodash'

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

export default (state = {}, action) => {
  switch(action.type) {
    case 'JOINED_CHANNEL':
      return {...state, [action.channel.name]: action.channel}
    case 'LEAVE_CHANNEL':
      var newState = Object.assign({}, state)
      delete newState[action.channel]
      return newState
    case 'NEW_CHANNEL_USER':
      var channel = action.payload.channel
      var users = state[channel].users
      var messages = state[channel].messages
      var newChannel = {...state[channel], users: [...users, action.payload.from], messages: [...messages, joinMessage(action.payload)]}
      return {...state, [channel]: newChannel}
    case 'USER_LEFT_CHANNEL':
      var channel = action.payload.channel
      var users = state[channel].users
      var messages = state[channel].messages
      var newChannel = {...state[channel], users: users.filter((user) => user.id !== action.payload.from.id), messages: [...messages, partMessage(action.payload)]}
      return {...state, [channel]: newChannel}
    case 'RECEIVE_MESSAGE':
      var channel = action.message.channel
      var messages = state[channel].messages
      var newChannel = {...state[channel], messages: [...messages, chatMessage(action.message)]}
      return {...state, [channel]: newChannel}
    default:
      return state
  }
}
