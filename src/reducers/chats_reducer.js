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

function createChannel(channel) {
  return {
    type: 'CHANNEL',
    selected: false,
    unread: 0,
    name: channel.name,
    users: channel.users,
    messages: []
  }
}

function createPM(user) {
  return {
    type: 'PRIVATE',
    selected: false,
    unread: 0,
    name: user.name,
    user,
    messages: []
  }
}

function updateChats(chats, filter, newChat) {
  var index = _.findIndex(chats, filter)
  var result = [...chats]
  result[index] = newChat
  return result
}

export default (state = [], action) => {
  console.log("reducing chats")
  console.log("state:", state)
  console.log("action:", action)
  switch(action.type) {
    case 'JOINED_CHANNEL':
      return [...state, {...createChannel(action.channel), selected: true}]
    case 'LEAVE_CHANNEL':
      return state.filter(() => !({type: 'CHANNEL', name: action.channel}))
    case 'USER_JOINED_CHANNEL':
      var channelIndex = _.findIndex(state, { type: 'CHANNEL', name: action.payload.channel })
      var result = [...state]
      result[channelIndex] = channelWithNewUser(
          channelWithNewMessage(state[channelIndex], joinMessage(action.payload)),
          action.payload.from)
      return result
    case 'USER_LEFT_CHANNEL':
      var channelIndex = _.findIndex(state, { type: 'CHANNEL', name: action.payload.channel })
      var result = [...state]
      result[channelIndex] = channelWithoutUser(
          channelWithNewMessage(state[channelIndex], partMessage(action.payload)),
          action.payload.from)
      return result
    case 'USER_DISCONNECTED':
      var channelIndex = _.findIndex(state, { type: 'CHANNEL', name: action.payload.channel })
      var result = [...state]
      result[channelIndex] = channelWithoutUser(
          channelWithNewMessage(state[channelIndex], disconnectMessage(action.payload)),
          action.payload.from)
      return result
    case 'RECEIVE_MESSAGE':
      var channelIndex = _.findIndex(state, { type: 'CHANNEL', name: action.message.channel })
      var result = [...state]
      result[channelIndex] = channelWithNewMessage(state[channelIndex], chatMessage(action.message))
      return result
    default:
      return state
  }
}
