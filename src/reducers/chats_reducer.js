import _ from 'lodash'

import {
  selectChat,
  addAndSelect,
  createChannel,
  createPM,
  selectLast,
  transformInArray,
  channelWithNewUser,
  channelWithoutUser,
  chatWithNewMessage,
  createIfAbsent,
  chatMessage,
  joinMessage,
  partMessage,
  disconnectMessage
} from '../util/chat_util'

export default (chats = [], action) => {
  switch(action.type) {
    case 'SELECT_CHAT':
      return selectChat(chats, {type: action.chat.type, name: action.chat.name})
    case 'JOINED_CHANNEL':
      var matcher = {type: 'CHANNEL', name: action.channel.name}
      return selectChat(createIfAbsent(chats, matcher, createChannel(action.channel)), matcher)
    case 'LEAVE_CHAT':
      return selectLast(chats.filter((chat) => !(chat.type == action.chat.type && chat.name == action.chat.name)))
    case 'USER_JOINED_CHANNEL':
      return transformInArray(chats, { type: 'CHANNEL', name: action.payload.channel },
        (match) => channelWithNewUser(
          chatWithNewMessage(match, joinMessage(action.payload)),
          action.payload.from))
    case 'USER_LEFT_CHANNEL':
      return transformInArray(chats, { type: 'CHANNEL', name: action.payload.channel },
        (match) => channelWithoutUser(
          chatWithNewMessage(match, partMessage(action.payload)),
          action.payload.from))
    case 'USER_DISCONNECTED':
      return transformInArray(chats, { type: 'CHANNEL', name: action.payload.channel },
        (match) => channelWithoutUser(
          chatWithNewMessage(match, disconnectMessage(action.payload)),
          action.payload.from))
    case 'NEW_CHANNEL_MESSAGE':
      return transformInArray(chats, { type: 'CHANNEL', name: action.message.channel },
        (match) => chatWithNewMessage(match, chatMessage(action.message)))
    case 'CREATE_PRIVATE_CHAT':
      var matcher = { type: 'PRIVATE', user: action.user }
      return selectChat(createIfAbsent(chats, matcher, createPM(action.user)), matcher)
    case 'NEW_PRIVATE_MESSAGE':
      var matcher = { type: 'PRIVATE', user: action.message.from }
      return transformInArray(
        selectChat(createIfAbsent(chats, matcher, createPM(action.message.from)), matcher),
        matcher,
        (match) => chatWithNewMessage(match, chatMessage(action.message)))
    case 'PRIVATE_MESSAGE_ECHO':
      return transformInArray(chats, { type: 'PRIVATE', user: action.message.to },
        (match) => chatWithNewMessage(match, chatMessage(action.message)))
    default:
      return chats
  }
}
