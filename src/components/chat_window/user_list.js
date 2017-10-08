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
        <h3>Users</h3>
        <ul className="list-group">
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
