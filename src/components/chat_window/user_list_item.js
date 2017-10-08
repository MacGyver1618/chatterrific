import React from 'react'

export default ({user, handleClick}) => <li className="list-group-item list-group-item-action clickable" onClick={handleClick}>{user.name}</li>
