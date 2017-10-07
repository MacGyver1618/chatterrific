import React from 'react'

import UserListItem from './user_list_item'
import { nameSort } from '../util/util'

export default (props) => {
  return (
    <div>
      <h3>Users</h3>
      <ul className="list-group">
        {
          props.users.sort(nameSort).map(
            (user) => <UserListItem user={user} key={user.id} />
          )
        }
      </ul>
    </div>
  )
}
