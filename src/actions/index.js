export function selectChannel(channel) {
  return {
    type: 'SELECT_CHANNEL',
    channel
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
