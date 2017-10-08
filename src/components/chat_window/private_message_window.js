import React from 'react'
import { connect } from 'react-redux'

import ChatTitle from './chat_title'
import ChatHistory from './chat_history'
import ChatInput from './chat_input'
import UserList from './user_list'

export default ({chat}) => (
  <div className="row full-height">
    <div className="col-md-12">
      <div className="row orange channel-title">
        <ChatTitle title={"Private chat with user " + chat.user.name}/>
      </div>
      <div className="row yellow chat-window">
        <ChatHistory messages={chat.messages}/>
      </div>
      <div className="row purple text-input">
        <ChatInput chat={chat} />
      </div>
    </div>
  </div>
)
