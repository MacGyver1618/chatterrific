import React from 'react'
import { connect } from 'react-redux'

import ChannelTitle from './channel_title'
import ChatHistory from './chat_history'
import ChatInput from './chat_input'
import UserList from './user_list'

class ChatWindow extends React.Component {

  render() {
    return (
      <div className="row full-height">
        <div className="col-md-9">
          <div className="row orange channel-title">
            <ChannelTitle channel={this.props.channel.name}/>
          </div>
          <div className="row yellow chat-window">
            <ChatHistory messages={this.props.channel.messages}/>
          </div>
          <div className="row purple text-input">
            <ChatInput channel={this.props.channel} />
          </div>
        </div>
        <div className="col-md-3 green">
          <UserList users={this.props.channel.users}/>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { channel: state.activeChannel }
}

export default connect(mapStateToProps)(ChatWindow)
