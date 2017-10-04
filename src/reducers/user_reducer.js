export default (state = "", action) => {
  switch(action.type) {
    case 'GOT_NEW_NAME':
      return action.user
    default:
      return state
  }
}
