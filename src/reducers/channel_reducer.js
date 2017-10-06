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

function disconnectMessage(payload) {
  return {
    ...payload,
    type: 'NOTIFICATION_MESSAGE',
    message: payload.from.name + " disconnected"
  }
}

function channelWithNewMessage(channel, message) {
  return {...channel, messages: [...channel.messages, message]}
}

function channelWithNewUser(channel, user) {
  return {...channel, users: [...channel.users, user]}
}

function channelWithoutUser(channel, userToRemove) {
  return {...channel, users: channel.users.filter((user) => user.id !== userToRemove.id)}
}

export default (state = {}, action) => {
  switch(action.type) {
    case 'JOINED_CHANNEL':
      return {...state, [action.channel.name]: action.channel}
    case 'LEAVE_CHANNEL':
      var newState = Object.assign({}, state)
      delete newState[action.channel]
      return newState
    case 'USER_JOINED_CHANNEL':
      return {...state,
        [action.payload.channel]: channelWithNewUser(
          channelWithNewMessage(state[action.payload.channel], joinMessage(action.payload)),
          action.payload.from)
      }
    case 'USER_LEFT_CHANNEL':
      var channelName = action.payload.channel
      return {...state,
        [action.payload.channel]: channelWithoutUser(
          channelWithNewMessage(state[action.payload.channel], partMessage(action.payload)),
          action.payload.from)
      }
    case 'USER_DISCONNECTED':
      var channelName = action.payload.channel
      return {...state,
        [action.payload.channel]: channelWithoutUser(
          channelWithNewMessage(state[action.payload.channel], disconnectMessage(action.payload)),
          action.payload.from)
      }
    case 'RECEIVE_MESSAGE':
      var channelName = action.payload.channel
      return {...state, [channelName]: channelWithNewMessage(state[channelName], chatMessage(action.message))}
    default:
      return state
  }
}
