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

function chatWithNewMessage(channel, message) {
  return {
    ...channel,
    messages: [...channel.messages, message],
    unread: channel.selected ? 0 : channel.unread + 1
  }
}

function channelWithNewUser(channel, user) {
  return {
    ...channel,
    users: [...channel.users, user]
  }
}

function channelWithoutUser(channel, userToRemove) {
  return {
    ...channel,
    users: channel.users.filter(() => !{id: userToRemove.id})
  }
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

function deselectAll(chats) {
  return [...chats.map((chat) => ({...chat, selected: false}))]
}

function transformInArray(arr, matcher, transformation) {
  var index = _.findIndex(arr, matcher)
  var result = [...arr]
  result[index] = transformation(result[index])
  return result
}

function selectLast(chats) {
  if (chats.length > 0)
    chats[chats.length - 1].selected = true
  return chats
}

export default (state = [], action) => {
  switch(action.type) {
    case 'SELECT_CHAT':
      var result = deselectAll(state)
      Object.assign(_.find(result, {type: action.chat.type, name: action.chat.name}), {selected: true, unread: 0})
      return result
    case 'JOINED_CHANNEL':
      return [...deselectAll(state), {...createChannel(action.channel), selected: true}]
    case 'LEAVE_CHAT':
      return selectLast(state.filter((chat) => !(chat.type == action.chat.type && chat.name == action.chat.name)))
    case 'USER_JOINED_CHANNEL':
      return transformInArray(state, { type: 'CHANNEL', name: action.payload.channel },
        (match) => channelWithNewUser(
          chatWithNewMessage(match, joinMessage(action.payload)),
          action.payload.from))
    case 'USER_LEFT_CHANNEL':
      return transformInArray(state, { type: 'CHANNEL', name: action.payload.channel },
        (match) => channelWithoutUser(
          chatWithNewMessage(match, partMessage(action.payload)),
          action.payload.from))
    case 'USER_DISCONNECTED':
      return transformInArray(state, { type: 'CHANNEL', name: action.payload.channel },
        (match) => channelWithoutUser(
          chatWithNewMessage(match, disconnectMessage(action.payload)),
          action.payload.from))
    case 'NEW_CHANNEL_MESSAGE':
      return transformInArray(state, { type: 'CHANNEL', name: action.message.channel },
        (match) => chatWithNewMessage(match, chatMessage(action.message)))
    case 'NEW_PRIVATE_MESSAGE':
      var channelIndex = _.findIndex(state, { type: 'PRIVATE', name: action.message.from })
      if (channelIndex < 0) {
        result = [...deselectAll(state), {...createPM(action.message.from), selected: true}]
        channelIndex = result.length - 1
      } else {
        result = [...state]
      }
      result[channelIndex] = chatWithNewMessage(result[channelIndex], chatMessage(action.message))
      return result
    default:
      return state
  }
}
