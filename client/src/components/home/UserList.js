import React, { useEffect, useState } from 'react'
import User from './User'

const UserList = (props) => {
  const [userList, setUserList] = useState([])

  useEffect(() => {
    fetch('/users')
      .then((res) => res.json())
      .then((users) => setUserList(users))
      .catch((e) => console.log('user fetch error: ', e))
    console.log(userList)
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