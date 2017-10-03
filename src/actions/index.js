export function selectChannel(channel) {
  return {
    type: 'SELECT_CHANNEL',
    channel
  }
}

export function addChannel(channel) {
  return {
    type: 'ADD_CHANNEL',
    channel: {...channel, messages: []}
  }
}

export function newChannelUser(payload) {
  return {
    type: 'NEW_CHANNEL_USER',
    payload
  }
}

export function userLeftChannel(payload) {
  return {
    type: 'USER_LEFT_CHANNEL',
    payload
  }
}

export function postMessage(channel, message) {
  return {
    type: 'POST_MESSAGE',
    payload: {
      room: channel,
      message: message
    }
  }
}

export function receiveMessage(message) {
  return {
    type: 'RECEIVE_MESSAGE',
    message
  }
}

export function gotNewName(user) {
  return {
    type: 'GOT_NEW_NAME',
    user
  }
}
