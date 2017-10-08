import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {joinChannel} from '../../actions/index'

class ChannelSelection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {channel: ''}
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.channel.trim())
      this.props.joinChannel(this.state.channel)
    this.setState({channel: ''})
  }

  render() {
    return (
      <div className="layout-wrapper">
        <div className="chat-list-heading">Join channel</div>
        <form className="form-inline" onSubmit={(event) => this.handleSubmit(event)}>
          <input type="text" className="channel-selection-input" placeholder="Join new channel" value={this.state.channel} onChange={(event) => this.setState({channel: event.target.value})} />
        </form>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinChannel }, dispatch)
}

export default connect(null, mapDispatchToProps)(ChannelSelection)
