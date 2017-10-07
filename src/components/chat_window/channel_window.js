import React from 'react'
import { connect } from 'react-redux'

import ChatTitle from './chat_title'
import ChatHistory from './chat_history'
import ChatInput from './chat_input'
import UserList from './user_list'

export default (props) => (
  <div className="row full-height">
    <div className="col-md-9">
      <div className="row orange channel-title">
        <ChatTitle channel={props.channel.name}/>
      </div>
      <div className="row yellow chat-window">
        <ChatHistory messages={props.channel.messages}/>
      </div>
      <div className="row purple text-input">
        <ChatInput channel={props.channel} />
      </div>
    </div>
    <div className="col-md-3 green">
      <UserList users={props.channel.users}/>
    </div>
  </div>
)
