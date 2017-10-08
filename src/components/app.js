import React from 'react'
import { connect } from 'react-redux'

import TitleBar from './title_bar'
import ChatList from './chat_list/chat_list'
import ChatWindow from './chat_window/chat_window'
import WelcomeScreen from './welcome_screen'

class App extends React.Component {

  renderApp() {
    return (
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
  }

  render() {
    if (!this.props.user.name)
      return <WelcomeScreen />
    return this.renderApp()
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(App)
