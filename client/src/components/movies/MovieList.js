import React, { useEffect, useState } from 'react'
import User from './Movie'

const UserList = (props) => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    // update to axios
    fetch('/users')
      .then((res) => res.json())
      .then((users) => setUserList(users))
      .catch((e) => console.log('user fetch error: ', e))
  })
  
  return (
    <div className="user-list-container">
      {userList.map((user, i) => (
        <User 
          key={i}
          firstName={user.firstName}
          lastName={user.lastName}
          posts={user.posts}
        />
      ))}
    </div>
  )
}

export default UserList