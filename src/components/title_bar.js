import React from 'react'
import { connect } from 'react-redux'
import UserInfoBox from './user_info_box'

class TitleBar extends React.Component {

  render() {
    return (
      <div className="red logo-bar col-md-12">
        <div className="row">
          <div className="pull-left col-md-9">
            <h1 className="title">Chatterriffic</h1>
          </div>
          <UserInfoBox user={this.props.user} />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(TitleBar)
