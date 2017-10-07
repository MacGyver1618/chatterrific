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
    this.props.postMessage(this.props.chat, this.state.message)
    this.setState({message: ''})
  }

  render() {
    return (
      <form className="form-inline" onSubmit={(event) => this.handleSubmit(event)}>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Type your message here..." value={this.state.message} onChange={(event) => this.setState({message: event.target.value})}/>
          <input type="submit" className="btn" value="Post message" />
        </div>
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
