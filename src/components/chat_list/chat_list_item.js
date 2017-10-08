import React from 'react'

export default ({chat, handleClick, handleLeave}) => (
    <li className={"list-group-item list-group-item-action" + (chat.selected ? " active" : "")}>
      <div className="chat-link pull-left clickable" onClick={handleClick}>#{chat.name}</div>
      <div className="unread-count pull-right">{chat.unread}</div>
      <div className="leave-button pull-right clickable" onClick={handleLeave}>Leave</div>
    </li>
  )
