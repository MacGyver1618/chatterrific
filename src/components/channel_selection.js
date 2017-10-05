import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import {joinChannel} from '../actions/index'

class ChannelSelection extends React.Component {

  constructor(props) {
    super(props)
    this.state = {channel: ''}
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.joinChannel(this.state.channel)
    this.setState({channel: ''})
  }

  render() {
    return (
      <form className="form-inline" onSubmit={(event) => this.handleSubmit(event)}>
        <h4>Join channel:</h4>
        <input type="text" className="form-control" placeholder="Join new channel" value={this.state.channel} onChange={(event) => this.setState({channel: event.target.value})} />
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ joinChannel }, dispatch)
}

export default connect(null, mapDispatchToProps)(ChannelSelection)
