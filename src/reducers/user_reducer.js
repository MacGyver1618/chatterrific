export default (state = {}, action) => {
  switch(action.type) {
    case 'GOT_NEW_NAME':
      return action.user
    case 'NAME_ALREADY_TAKEN':
      return {
        error: ("Name " + action.name + " was already taken. Please try another one.")
      }
    default:
      return state
  }
}
