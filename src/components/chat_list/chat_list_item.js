import React from 'react'

export default ({chat, handleClick, handleLeave}) => (
    <li className={"chat-list-item" + (chat.selected ? " selected-item" : "")}>
      <span className="chat-link clickable" onClick={handleClick}>#{chat.name}</span>
      {chat.unread > 0 ? <span className="unread-count">{chat.unread}</span> : ""}
      <span className="leave-button clickable" onClick={handleLeave}>X</span>
    </li>
  )
