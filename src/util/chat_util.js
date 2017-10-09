export function chatWithNewMessage(chat, message) {
  return {
    ...chat,
    messages: [...chat.messages, message],
    unread: chat.selected ? 0 : chat.unread + 1
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

export function createIfAbsent(collection, matcher, element) {
  if (_.find(collection, matcher))
    return [...collection]
  return [...collection, element]
}

export function selectChat(chats, matcher) {
  var result = deselectAll(chats)
  Object.assign(_.find(result, matcher), {selected: true, unread: 0})
  return result
}
