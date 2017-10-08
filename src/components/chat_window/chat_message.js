import React from 'react'

export default (props) => (
  <div className="message">
    <span className="timestamp">{props.message.timestamp.substring(11,19)}</span>
    <span className="message-user-name">{props.message.from.name}</span>
    <span className="message-body">{props.message.message}</span>
  </div>
)
