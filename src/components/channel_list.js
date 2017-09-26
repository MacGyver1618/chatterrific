import React from 'react'
import ChannelListItem from './channel_list_item'

export default (props) => {
  return (
    <div>
      <h3>Channel list</h3>
      <ul className="list-group">
        {
          props.channels.map(
            (channel) => <ChannelListItem channel={channel} key={channel.key}/>
          )
        }
      </ul>
    </div>
  )
}
