import React from 'react'

export default (props) => <li className="list-group-item" onClick={() => props.onClick(props.channel)}>#{props.channel.name}</li>
