import React from 'react'
import { connect } from 'react-redux'

import ChatTitle from './chat_title'
import ChatHistory from './chat_history'
import ChatInput from './chat_input'
import UserList from './user_list'

export default (props) => (
  <div className="row full-height">
    <div className="col-md-9">
      <div className="row chat-title-row">
        <ChatTitle title={'#' + props.channel.name}/>
      </div>
      <div className="row chat-window">
        <ChatHistory messages={props.channel.messages}/>
      </div>
      <div className="row text-input">
        <ChatInput chat={props.channel} />
      </div>
    </div>
    <div className="col-md-3 scrolling user-list">
      <UserList users={props.channel.users}/>
    </div>
  </div>
)
