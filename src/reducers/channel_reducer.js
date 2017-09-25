const placeholder = {
  channels: [
    {
      name: "foo",
      key: "a"
    },
    {
      name: "bar",
      key: "b"
    },
    {
      name: "baz",
      key: "c"
    }
  ]
}

export default (state = placeholder, action) => {
  switch(action.type) {
    case 'JOIN_CHANNEL':
      return state.concat(action.channel)
    default:
      return state
  }
}
