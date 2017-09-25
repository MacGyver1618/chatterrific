import React from 'react'
import ChannelTitle from './channel_title'
import ChatHistory from './chat_history'
import ChatInput from './chat_input'
import UserList from './user_list'

export default (props) => (
  <div className="row full-height">
    <div className="col-md-9">
      <div className="row orange channel-title">
        <ChannelTitle channel={props.channel.name}/>
      </div>
      <div className="row yellow chat-window">
        <ChatHistory messages={props.channel.messages}/>
      </div>
      <div className="row purple text-input">
        <ChatInput />
      </div>
    </div>
    <div className="col-md-3 green">
      <UserList users={props.channel.users}/>
    </div>
  </div>
)
