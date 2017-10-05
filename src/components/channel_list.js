import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectChannel, leaveChannel } from '../actions/index'
import ChannelListItem from './channel_list_item'
import ChannelSelection from './channel_selection'

class ChannelList extends React.Component {

  getChannels() {
    var placeholderText = "You're not on any channels. Join one below!"
    if (this.props.channels.length == 0)
      return <span className="info-text">{placeholderText}</span>
    return this.props.channels.map(
        (channel) => <ChannelListItem channel={channel} key={channel.name} handleClick={(channel) => this.props.selectChannel(channel)} handleLeave={(channel) => this.props.leaveChannel(channel.name)} />
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
    channels: Object.values(state.channels)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChannel, leaveChannel }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
