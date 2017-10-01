import React from 'react'
import { connect } from 'react-redux'
import ChannelListItem from './channel_list_item'

class ChannelList extends React.Component {
  render() {
    return (
      <div>
        <h3>Channel list</h3>
        <ul className="list-group">
          {
            this.props.channels.map(
              (channel) => <ChannelListItem channel={channel} key={channel.key}/>
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

export default connect(mapStateToProps)(ChannelList)
