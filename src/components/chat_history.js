import React from 'react'
import Message from './message'

export default (props) => {
  return (
    <div className="message-history">
      {
        props.messages.map(
          (message) => <Message message={message} key={message.message} />
        )
      }
    </div>
  )
}
