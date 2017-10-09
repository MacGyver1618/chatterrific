import React from 'react'

export default ({user}) => (
  <div className="row full-height">
    <div className="col-md-12">
      <div className="text-center chat-placeholder-content">
        <h1>{"Hi, " + user.name + "."}</h1>
        <p className="lead">{"You're not on any channels yet. Join one by typing the name in the box on the left!"}</p>
      </div>
    </div>
  </div>
)
