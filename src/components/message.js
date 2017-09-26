import React from 'react'

export default (props) => (
  <div className="message">
    <span className="timestamp">{props.message.timestamp}</span>
    <span className="user-name">{props.message.user}</span>
    <span className="message-body">{props.message.message}</span>
  </div>
)