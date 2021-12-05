import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCurrUser } from '../../services/authService'
import { getUserProfile } from '../../services/userService'
import ApiError from '../errors/ApiError'
import '../../styles/users/userProfile.css'

const UserProfile = (props) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  // const currUser = getCurrUser()

  // request user profile
  useEffect(() => {
    getUserProfile()
      .then((res) => setUser(res.data))
      .catch((e) => setError(e.response))
  }, [])

  return (
    <>
      {error ? (
        <ApiError error={error} />
      ) : user ? (
        //<div className="user-page-container">{JSON.stringify(user)}
        <div className="user-page-container">
          <p>First Name: {user.firstName}</p>
          <p>Last Name: {user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Username: {user.username}</p>
          <p>Watchlist</p>
          <ul className="watchlist">
            {user.watchlist.length === 0 ? (
              <li>N/A</li>
            ) : (
              user.watchlist.map((item) => (
                //console.log(item)
                <li>{item}</li>
              ))
            )}
          </ul>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default UserProfile
