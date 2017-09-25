const placeholder = 'Joni'

export default (state = placeholder, action) => {
  switch(action.type) {
    case 'CHANGE_USERNAME':
      return {...state, user.name = action.newName }
    default:
      return state
  }
}
