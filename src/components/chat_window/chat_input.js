import React from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {postMessage} from '../../actions/index'

class ChatInput extends React.Component {

  constructor(props) {
    super(props)
    this.state = { message: ''}
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.message.trim())
      this.props.postMessage(this.props.chat, this.state.message)
    this.setState({message: ''})
  }

  render() {
    return (
      <form className="form-inline full-width full-height" onSubmit={(event) => this.handleSubmit(event)}>
        <input type="text" className="chat-input-box" placeholder="Type your message here..." value={this.state.message} onChange={(event) => this.setState({message: event.target.value})} autoFocus />
        <input type="submit" className="btn chat-submit clickable" value="Send" />
      </form>
    )
  }

}

function mapStateToProps(state) {
  return { chat: state.chats.filter((chat) => chat.selected)[0] }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ postMessage }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChatInput)
