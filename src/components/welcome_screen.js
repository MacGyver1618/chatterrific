import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { selectUserName } from '../actions/index'

class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = { userName: ''}
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.selectUserName(this.state.userName)
    this.setState({userName: ''})
  }

  errorMessage() {
    if (this.props.user.error)
      return this.props.user.error
  }

  render() {
    return(
      <div className="jumbotron">
        <h1 className="display-3">Welcome to Chatterriffic</h1>
        <p className="lead">To get started, enter you username below.</p>
        <form className="form-inline" onSubmit={(event) => this.handleSubmit(event)}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="Your nickname" value={this.state.userName} onChange={(event) => this.setState({userName: event.target.value})}/>
            <input type="submit" className="btn" value="Join" />
          </div>
        </form>
        <div className="error-message">
          <p>{this.errorMessage()}</p>
        </div>
      </div>
    )
  }
}

function mapStateToProps({user}) {
  return {user}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUserName }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
