import React from 'react'
import { connect } from 'react-redux'

import ChannelWindow from './channel_window'
import PrivateMessageWindow from './private_message_window'

class ChatWindow extends React.Component {

  render() {
    if (!this.props.chat) {
      var placeholderText = "You're not on any channels. Join one from the panel on the left!"
      return <div className="row full-height">{placeholderText}</div>
    }
    switch (this.props.chat.type) {
      case 'CHANNEL':
        return <ChannelWindow channel={this.props.chat} />
      case 'PRIVATE':
        return <PrivateMessageWindow chat={this.props.chat} />
    }
  }

}

function mapStateToProps(state) {
  return { chat: state.chats.filter((chat) => chat.selected)[0] }
}

export default connect(mapStateToProps)(ChatWindow)
