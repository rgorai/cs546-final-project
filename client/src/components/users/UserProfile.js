/* eslint-disable no-throw-literal */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserProfile } from '../../services/userService'
import ApiError from '../errors/ApiError'
import ReviewList from './ReviewList'
import MediaList from '../movies/MediaList'
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

  useEffect(() => {
    if (user) console.log('profile', user.watchlist)
  }, [user])

  return error ? (
    <ApiError error={error} />
  ) : user ? (
    <div className="card-background user-page-container">
      <div className="flex-horizontal profile-heading-container">
        <h1>Welcome, {user.username}</h1>
        <div>
          <button onClick={() => navigate('/profile/edit')}>
            Edit Profile
          </button>
          <button onClick={() => navigate('/profile/mediaRequest')}>
            Request Media
          </button>
        </div>
      </div>
      <MediaList title="My Watchlist" mediaList={user.watchlist} />

      <h2>My Reviews</h2>
      <ReviewList reviews={user.reviews} displayContentName />
    </div>
  ) : (
    <div className="loading">Loading...</div>
  )
}

export default UserProfile
