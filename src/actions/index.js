export function joinChannel(channel) {
  return  {
    type: 'JOIN_CHANNEL',
    channel
  }
}

export function joinedChannel(channel) {
  return {
    type: 'JOINED_CHANNEL',
    channel: {...channel, messages: []}
  }
}

export function leaveChat(chat) {
  return  {
    type: 'LEAVE_CHAT',
    chat
  }
}

export function selectChat(chat) {
  return {
    type: 'SELECT_CHAT',
    chat
  }
}

export function userJoinedChannel(payload) {
  return {
    type: 'USER_JOINED_CHANNEL',
    payload
  }
}

export function userLeftChannel(payload) {
  return {
    type: 'USER_LEFT_CHANNEL',
    payload
  }
}

export function userDisconnected(payload) {
  return {
    type: 'USER_DISCONNECTED',
    payload
  }
}

export function postMessage(chat, message) {
  return {
    type: 'POST_MESSAGE',
    payload: {
      chat,
      message
    }
  }
}

export function newChannelMessage(message) {
  return {
    type: 'NEW_CHANNEL_MESSAGE',
    message
  }
}

export function gotNewName(user) {
  return {
    type: 'GOT_NEW_NAME',
    user
  }
}
