import React from 'react'
import ReactDOM from 'react-dom'

import TitleBar from './components/title_bar'
import ChannelList from './components/channel_list'
import ChatWindow from './components/chat_window'


var state = {
  user: {
    name: "Joni"
  },
  channels: [
    {
      name: "foo",
      key: "a"
    },
    {
      name: "bar",
      key: "b"
    },
    {
      name: "baz",
      key: "c"
    }
  ],
  activeChannel: {
    name: "talvivaara",
    users: [
      {
        name: "Joni",
        key: 12
      },
      {
        name: "Kati",
        key: 13
      }
    ],
    messages: [
      {
        user: "Joni",
        timestamp: "18.20.00",
        message: "Moi!",
        key: 1
      },
      {
        user: "Kati",
        timestamp: "18.20.05",
        message: "no moi (:",
        key: 2
      }
    ]
  }

}

/*
var socket
*/

const App = () => (
  <div className="container-fluid full-height">
    <div className="row">
      <TitleBar user={state.user}/>
    </div>
    <div className="row chat-body">
      <div className="col-md-2 blue">
        <ChannelList channels={state.channels} />
      </div>
      <div className="col-md-10">
        <ChatWindow channel={state.activeChannel} />
      </div>
    </div>
  </div>
)

const target = document.querySelector("#app")
ReactDOM.render(<App />, target)
