const placeholder = [
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
]

export default (state = placeholder, action) => {
  switch(action.type) {
    case 'JOIN_CHANNEL':
      return state.concat(action.channel)
    default:
      return state
  }
}
