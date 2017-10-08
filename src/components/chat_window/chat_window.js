import React from 'react'
import { connect } from 'react-redux'

import ChannelWindow from './channel_window'
import PrivateMessageWindow from './private_message_window'
import PlaceholderWindow from './placeholder_window'

class ChatWindow extends React.Component {

  render() {
    if (!this.props.chat)
      return <PlaceholderWindow user={this.props.user}/>
    switch (this.props.chat.type) {
      case 'CHANNEL':
        return <ChannelWindow channel={this.props.chat} />
      case 'PRIVATE':
        return <PrivateMessageWindow chat={this.props.chat} />
    }
  }

}

function mapStateToProps(state) {
  return {
    user: state.user,
    chat: state.chats.filter((chat) => chat.selected)[0]
  }
}

export default connect(mapStateToProps)(ChatWindow)
