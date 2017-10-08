import React from 'react'
import { connect } from 'react-redux'
import UserInfoBox from './user_info_box'

class TitleBar extends React.Component {

  render() {
    return (
      <div className="title-bar col-md-12">
        <div className="row">
          <div className="pull-left col-md-9">
            <h1 className="title-element title align-middle">Chatterriffic</h1>
          </div>
          <div className="pull-right col-sm-3 text-right">
            <UserInfoBox user={this.props.user} />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({user}) {
  return { user }
}

export default connect(mapStateToProps)(TitleBar)
