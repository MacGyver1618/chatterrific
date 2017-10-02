import _ from 'lodash'

const placeholder = _.keyBy([
  {
    name: "foo",
    users: [{
      name: "Joni"
    }],
    messages: []
  },
  {
    name: "bar",
    users: [
      {
        name: "Joni"
      },
      {
        name: "Kati"
      }],
    messages: []
  },
  {
    name: "baz",
    users: [
      {
        name: "Joni"
      },
      {
        name: "Kati"
      },
      {
        name: "Ölli"
      }],
    messages: []
  }
], 'name')

export default (state = placeholder, action) => {
  switch(action.type) {
    case 'JOIN_CHANNEL':
      return state.concat(action.channel)
    case 'RECEIVE_MESSAGE':
      var channel = action.message.room
      var messages = state[channel].messages
      var newChannel = {...state[channel], messages: [...messages, action.message]}
      console.log(newChannel)
      return {...state, [channel]: newChannel}
    default:
      return state
  }
}
