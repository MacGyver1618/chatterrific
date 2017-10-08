import React from 'react'

export default ({user}) => (
  <div className="row full-height">
    <div className="col-md-12">
      <h2>{"Hi, " + user.name + "."}</h2>
      <p>{"You're not on any channels yet. Join one by typing the name in the box on the left!"}</p>
    </div>
  </div>
)
