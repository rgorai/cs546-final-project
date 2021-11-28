import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { getCurrUser } from '../../services/authService'
import { getUserContent } from '../../services/userService'
import ApiError from '../errors/ApiError'
import '../../styles/users/userProfile.css'

const UserProfile = (props) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  // const currUser = getCurrUser()

  // get protected content
  useEffect(() => {
    getUserContent()
      .then((res) => setUser(res.data))
      .catch((e) => setError(e.response))
  }, [])

  return (
    <>
      {!user && !error ? (
        <div>Loading</div>
      ) : error ? (
        <ApiError status={error.status} statusMessage={error.statusText} />
      ) : (
        <div className="user-page-container">{JSON.stringify(user)}</div>
      )}
    </>
  )
}

export default UserProfile
