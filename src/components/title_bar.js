import React from 'react'
import UserInfoBox from './user_info_box'

export default (props) => (
  <div className="red logo-bar col-md-12">
    <div className="row">
      <div className="pull-left col-md-9">
        <h1 className="title">Chatterriffic</h1>
      </div>
      <UserInfoBox user={props.user} />
    </div>
  </div>
)
