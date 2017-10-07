import React from 'react'

import TitleBar from './title_bar'
import ChatList from './chat_list'
import ChatWindow from './chat_window'

export default () => (
  <div className="container-fluid full-height">
    <div className="row">
      <TitleBar />
    </div>
    <div className="row chat-body">
      <div className="col-md-2 blue">
        <ChatList />
      </div>
      <div className="col-md-10">
        <ChatWindow />
      </div>
    </div>
  </div>
)
