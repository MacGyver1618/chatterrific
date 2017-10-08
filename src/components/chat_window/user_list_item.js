import React from 'react'

export default ({user, handleClick}) => <li className="user-list-item clickable" onClick={handleClick}>{user.name}</li>
