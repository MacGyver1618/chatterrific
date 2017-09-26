const placeholder = { name: 'Joni' }

export default (state = placeholder, action) => {
  switch(action.type) {
    case 'CHANGE_USERNAME':
      return state
      //return {...state, user.name = action.newName }
    default:
      return state
  }
}
