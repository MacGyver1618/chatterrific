import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectChannel, leaveChannel } from '../actions/index'
import ChatListItem from './chat_list_item'
import ChannelSelection from './channel_selection'

class ChatList extends React.Component {

  getChannels() {
    var placeholderText = "You're not on any channels. Join one below!"
    if (this.props.channels.length == 0)
      return <span className="info-text">{placeholderText}</span>
    return this.props.channels.map(
        (channel) => <ChatListItem channel={channel} key={channel.name} handleClick={(channel) => this.props.selectChannel(channel)} handleLeave={(channel) => this.props.leaveChannel(channel.name)} />
      )
  }

  render() {
    return (
      <div>
        <h3>Channel list</h3>
        <ul className="list-group">
          {this.getChannels()}
        </ul>
        <ChannelSelection />
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

function nameSort(a, b) {
  var nameA = a.name.toUpperCase()
  var nameB = b.name.toUpperCase()
  return nameA < nameB ? -1 : nameA > nameB ? 1 : 0
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChannel, leaveChannel }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatList)
