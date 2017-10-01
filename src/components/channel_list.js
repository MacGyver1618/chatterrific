import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectChannel, postMessage } from '../actions/index'
import ChannelListItem from './channel_list_item'

class ChannelList extends React.Component {
  render() {
    return (
      <div>
        <h3>Channel list</h3>
        <ul className="list-group">
          {
            this.props.channels.map(
              (channel) => <ChannelListItem channel={channel} key={channel.name} onClick={() => this.props.selectChannel(channel, {})}/> // TODO: change back to selectChannel(channel)
            )
          }
        </ul>
      </div>
  )
}}

function mapStateToProps(state) {
  return {
    channels: state.channels
  }
}

function mapDispatchToProps(dispatch) {
  // TODO: change selectChannel to selectChannel
  return bindActionCreators({ selectChannel: postMessage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
