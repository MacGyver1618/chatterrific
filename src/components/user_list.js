import React from 'react'
import UserListItem from './user_list_item'

export default (props) => {
  return (
    <div>
      <h3>Users</h3>
      <ul className="list-group">
        {
          props.users.map(
            (user) => <UserListItem user={user} key={user.key} />
          )
        }
      </ul>
    </div>
  )
}
