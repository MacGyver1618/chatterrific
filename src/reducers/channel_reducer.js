import _ from 'lodash'

export default (state = {}, action) => {
  switch(action.type) {
    case 'ADD_CHANNEL':
      return {...state, [action.channel.name]: action.channel}
    case 'NEW_CHANNEL_USER':
      var channel = action.payload.channel
      var users = state[channel].users
      var newChannel = {...state[channel], users: [...users, action.payload.user]}
      return {...state, [channel]: newChannel}
    case 'USER_LEFT_CHANNEL':
      var channel = action.payload.channel
      var users = state[channel].users
      var newChannel = {...state[channel], users: users.filter((user) => user.id !== action.payload.user.id)} 
      return {...state, [channel]: newChannel}
    case 'RECEIVE_MESSAGE':
      var channel = action.message.room
      var messages = state[channel].messages
      var newChannel = {...state[channel], messages: [...messages, action.message]}
      return {...state, [channel]: newChannel}
    default:
      return state
  }
}
