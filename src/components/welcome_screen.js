import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { selectUserName, nameEmpty } from '../actions/index'

class WelcomeScreen extends React.Component {

  constructor(props) {
    super(props)
    this.state = { userName: ''}
  }

  handleSubmit(event) {
    event.preventDefault()
    if (this.state.userName.trim())
      this.props.selectUserName(this.state.userName)
    else
      this.props.nameEmpty()
    this.setState({userName: ''})
  }

  errorMessage() {
    if (this.props.user.error)
      return this.props.user.error
  }

  render() {
    return(
      <div className="jumbotron text-center welcome-screen">
        <h1 className="display-3 welcome-text">Welcome to Chatterriffic</h1>
        <p className="lead">To get started, enter you username below.</p>
        <div className="container">
          <div className="row justify-content-md-center">
            <form className="form form-inline" onSubmit={(event) => this.handleSubmit(event)}>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Your nickname" value={this.state.userName} onChange={(event) => this.setState({userName: event.target.value})} autoFocus />
                <input type="submit" className="btn welcome-button" value="Join" />
              </div>
            </form>
          </div>
          <div className="row error-message justify-content-md-center">
            <p>{this.errorMessage()}</p>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({user}) {
  return {user}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectUserName, nameEmpty }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
