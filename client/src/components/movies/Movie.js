import React from 'react';

const user = (props) => {
  return (
    <div className="user-container">
      <div>
        {props.firstName}
      </div>
      <div>
        {props.lastName}
      </div>
      <div>
        {props.posts.map((e) => (
          <div>{JSON.stringify(e)}</div>
        ))}
      </div>
    </div>
  )
}

export default user