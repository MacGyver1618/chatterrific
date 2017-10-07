import React from 'react'

export default (props) => (
  <div className="message">
    <span className="timestamp">{props.message.timestamp.substring(11,19)}</span>
    <span className="message-body notification-message">{props.message.message}</span>
  </div>
)
