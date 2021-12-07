import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserProfile } from '../../services/userService'
import ApiError from '../errors/ApiError'
import '../../styles/users/userProfile.css'

const UserProfile = (props) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // request user profile
  useEffect(() => {
    document.title = 'Profile'
    getUserProfile()
      .then((res) => setUser(res.data))
      .catch((e) => setError(e.response))
  }, [])

  return (
    <div className="profile-container">
      {error ? (
        <ApiError error={error} />
      ) : user ? (
        <div className="user-page-container">
          <div>[User Info Here (watchlist, reviews, liked movies?)]</div>
          <button onClick={() => navigate('/profile/edit')}>
            Edit Profile
          </button>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default UserProfile
