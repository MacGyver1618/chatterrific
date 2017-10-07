export function chatMessage(payload) {
  return {
    ...payload,
    type: 'CHAT_MESSAGE'
  }
}

export function joinMessage(payload) {
  return {
    ...payload,
    type: 'NOTIFICATION_MESSAGE',
    message: payload.from.name + " joined channel " + payload.channel
  }
}

export function partMessage(payload) {
  return {
    ...payload,
    type: 'NOTIFICATION_MESSAGE',
    message: payload.from.name + " left channel " + payload.channel
  }
}

export function disconnectMessage(payload) {
  return {
    ...payload,
    type: 'NOTIFICATION_MESSAGE',
    message: payload.from.name + " disconnected"
  }
}

export function chatWithNewMessage(channel, message) {
  return {
    ...channel,
    messages: [...channel.messages, message],
    unread: channel.selected ? 0 : channel.unread + 1
  }
}

export function channelWithNewUser(channel, user) {
  return {
    ...channel,
    users: [...channel.users, user]
  }
}

export function channelWithoutUser(channel, userToRemove) {
  return {
    ...channel,
    users: channel.users.filter((user) => user.id !== userToRemove.id)
  }
}

export function createChannel(channel) {
  return {
    type: 'CHANNEL',
    selected: false,
    unread: 0,
    name: channel.name,
    users: channel.users,
    messages: []
  }
}

export function createPM(user) {
  return {
    type: 'PRIVATE',
    selected: false,
    unread: 0,
    name: user.name,
    user,
    messages: []
  }
}

export function deselectAll(chats) {
  return [...chats.map((chat) => ({...chat, selected: false}))]
}

export function transformInArray(arr, matcher, transformation) {
  var index = _.findIndex(arr, matcher)
  var result = [...arr]
  result[index] = transformation(result[index])
  return result
}

export function selectLast(chats) {
  if (chats.length > 0)
    chats[chats.length - 1].selected = true
  return chats
}

export function addAndSelect(chats, newChat) {
  return [...deselectAll(chats), {...newChat, selected: true}]
}

export function createIfAbsent(chats, matcher, chat) {
  if (_.findIndex(chats, matcher) < 0)
    return addAndSelect(chats, chat)
  return [...chats]
}

export function selectChat(chats, matcher) {
  var result = deselectAll(chats)
  Object.assign(_.find(result, matcher), {selected: true, unread: 0})
  return result
}
