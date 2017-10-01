var placeholder = {
  name: "",
  users: [],
  messages: []
}

export default (state = placeholder, action) => {
  switch(action.type) {
    case 'SELECT_CHANNEL':
      return action.channel
    default:
      return state
  }
}
