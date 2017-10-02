import {store} from '../index'

var placeholder = {
  name: "",
  users: [],
  messages: []
}

export default (state = placeholder, action) => {
  switch(action.type) {
    case 'SELECT_CHANNEL':
      return action.channel
    case 'RECEIVE_MESSAGE':
      if (action.message.room === state.name)
        return {...state, messages: [...state.messages, action.message]}
      else
        return state
    default:
      return state
  }
}
