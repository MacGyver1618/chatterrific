import React from 'react'

import TitleBar from './title_bar'
import ChannelList from './channel_list'
import ChatWindow from './chat_window'

export default () => (
  <div className="container-fluid full-height">
    <div className="row">
      <TitleBar />
    </div>
    <div className="row chat-body">
      <div className="col-md-2 blue">
        <ChannelList />
      </div>
      <div className="col-md-10">
        <ChatWindow />
      </div>
    </div>
  </div>
)
