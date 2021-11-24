import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrUser } from '../../services/authService'
import { getUserContent } from '../../services/userService'
// import '../../styles/users/userProfile.css'

const UserProfile = (props) => {
  const [user, setUser] = useState(getCurrUser())

  // get protected content
  useEffect(() => {
    getUserContent()
      // authorized
      .then((res) => console.log('user content', res.data))
      // unauthorized
      .catch((e) => console.log('user content error', e.response.data))
  }, [])

  return (
    <div className="user-page-container">
      {user
        ? JSON.stringify(user)
        : 'You are not signed in.'}
    </div>
  )
}

export default UserProfile