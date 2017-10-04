import React from 'react'
import ReactDOM from 'react-dom'
import Message from './message'

class ChatHistory extends React.Component {

  componentWillUpdate() {
    var node = ReactDOM.findDOMNode(this);
    this.shouldScrollBottom = node.scrollTop + node.offsetHeight === node.scrollHeight;
  }

  componentDidUpdate() {
    if (this.shouldScrollBottom) {
      var node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight
    }
  }

  render() {
    return (
      <div className="message-history scrolling">
        {
          this.props.messages.map(
            (message) => <Message message={message} key={message.user.id + message.timestamp} />
          )
        }
      </div>
    )
  }
}

export default ChatHistory
