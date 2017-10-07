import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ChatListItem from './chat_list_item'
import ChannelSelection from './channel_selection'
import { selectChat, leaveChat } from '../../actions/index'
import { nameSort } from '../../util/sort_util'

class ChatList extends React.Component {

  getChannels() {
    if (this.props.channels.length == 0)
      return <span className="info-text">{"You're not on any channels. Join one below!"}</span>
    return this.props.channels.map(
        (chat) => <ChatListItem chat={chat} key={chat.name} handleClick={(event) => this.props.selectChat(chat)} handleLeave={(event) => this.props.leaveChat(chat)} />
      )
  }

  getPrivateMessages() {
    if (this.props.privateMessages.length == 0)
      return <span className="info-text">{"You don't have any private messages."}</span>
    return this.props.privateMessages.map(
        (chat) => <ChatListItem chat={chat} key={chat.name} handleClick={(event) => this.props.selectChat(chat)} handleLeave={(event) => this.props.leaveChat(chat)} />
      )
  }

  render() {
    return (
      <div>
        <h3>Channels</h3>
        <ul className="list-group">
          {this.getChannels()}
        </ul>
        <ChannelSelection />
        <h3>Private messages</h3>
        <ul className="list-group">
          {this.getPrivateMessages()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    channels: state.chats.filter((chat) => chat.type == 'CHANNEL').sort(nameSort),
    privateMessages: state.chats.filter((chat) => chat.type == 'PRIVATE').sort(nameSort)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChat, leaveChat }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
