import React from 'react'

export default ({channel, handleClick}) => <li className="list-group-item list-group-item-action clickable" onClick={() => handleClick(channel)}>#{channel.name}</li>
