import React from 'react'
import Message from './message'

export default (props) => {
  if (!props.messages)
    props = {messages: []}
  return (
    <div className="message-history">
      {
        props.messages.map(
          (message) => <Message message={message} key={message.key} />
        )
      }
    </div>
  )
}
