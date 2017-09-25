import React from 'react'
import Message from './message'

export default (props) => (
  <div className="message-history">
    {
      props.messages.map(
        (message) => <Message message={message} key={message.key} />
      )
    }
  </div>
)
