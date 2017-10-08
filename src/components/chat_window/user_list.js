import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import UserListItem from './user_list_item'
import { createPrivateChat } from '../../actions/index'
import { nameSort } from '../../util/sort_util'

class UserList extends React.Component {
  render() {
    return (
      <div>
        <span className="user-list-heading">{this.props.users.length + " user" + (this.props.users.length > 1 ? "s" : "")}</span>
        <ul className="user-list-group">
          {
            this.props.users.sort(nameSort).map(
              (user) => <UserListItem user={user} key={user.id} handleClick={() => this.props.createPrivateChat(user)}/>
            )
          }
        </ul>
      </div>
    )
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createPrivateChat }, dispatch)
}

export default connect(null, mapDispatchToProps)(UserList)
