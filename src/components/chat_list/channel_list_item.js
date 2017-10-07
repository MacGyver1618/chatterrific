import React from 'react'

export default ({channel, handleClick, handleLeave}) =>
  (
    <li className="list-group-item list-group-item-action">
      <div className="channel-link pull-left clickable" onClick={() => handleClick(channel)}>#{channel.name}</div>
      <div className="unread-count pull-right">{channel.unread}</div>
      <div className="leave-button pull-right clickable" onClick={() => handleLeave(channel)}>Leave</div>
    </li>
  )
