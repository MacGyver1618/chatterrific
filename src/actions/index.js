export function selectChannel(channel) {
  return {
    type: 'SELECT_CHANNEL',
    channel
  }
}

export function postMessage(channel, message) {
  return {
    type: 'POST_MESSAGE',
    message
  }
}
