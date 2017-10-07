import React from 'react'

export default ({chat, handleClick, handleLeave}) => (
    <li className={"list-group-item list-group-item-action" + (chat.selected ? " active" : "")}>
      <div className="chat-link pull-left clickable" onClick={(event) => handleClick(chat)}>#{chat.name}</div>
      <div className="unread-count pull-right">{chat.unread}</div>
      <div className="leave-button pull-right clickable" onClick={(event) => handleLeave(chat)}>Leave</div>
    </li>
  )
