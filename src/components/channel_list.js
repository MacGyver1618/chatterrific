import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { selectChannel } from '../actions/index'
import ChannelListItem from './channel_list_item'

class ChannelList extends React.Component {
  render() {
    return (
      <div>
        <h3>Channel list</h3>
        <ul className="list-group">
          {
            this.props.channels.map(
              (channel) => <ChannelListItem channel={channel} key={channel.name} handleClick={(channel) => this.props.selectChannel(channel)}/>
            )
          }
        </ul>
      </div>
  )
}}

function mapStateToProps(state) {
  return {
    channels: Object.values(state.channels)
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectChannel: selectChannel }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChannelList)
