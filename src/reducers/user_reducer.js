export default (state = "", action) => {
  switch(action.type) {
    case 'GOT_NEW_NAME':
      console.log(action)
      return action.user
    default:
      return state
  }
}
