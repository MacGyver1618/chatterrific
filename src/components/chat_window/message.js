import React from 'react'

import ChatMessage from './chat_message'
import NotificationMessage from './notification_message'

export default (props) => {
  switch (props.message.type) {
    case 'NOTIFICATION_MESSAGE':
      return <NotificationMessage message={props.message} />
    case 'CHAT_MESSAGE':
      return <ChatMessage message={props.message} />
  }
}
