/* eslint-disable no-throw-literal */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getUserProfile } from '../../services/userService'
import ApiError from '../errors/ApiError'
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

  return error ? (
    <ApiError error={error} />
  ) : user ? (
    <div className="card-background user-page-container">
      <div className="flex-horizontal profile-heading-container">
        <h1>Profile</h1>
        <div>
          <button onClick={() => navigate('/profile/edit')}>
            Edit Profile
          </button>
          <button onClick={() => navigate('/profile/mediaRequest')}>
            Request Media
          </button>
        </div>
      </div>

      <MediaList name="My Watchlist" mediaList={user.watchlist} />

      <div className="user-reviews">
        <label className="desc-bold heading">My Reviews :</label>
        {user.reviews.length === 0 ? (
          <div className="none-message">No Reviews</div>
        ) : (
          user.reviews.map((item, i) => (
            <div key={i}>
              <p>
                <label>Content Name:</label>
                {item.contentName}
              </p>
              <p>
                <label>Date of Review: </label>
                {item.dateOfReview}
              </p>
              <p>
                <label>Liked / Disliked: </label>
                {item.like_dislike === 1 ? 'Liked' : 'Disliked'}
              </p>
              <p>
                <label>Review: </label> {item.review}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  ) : (
    <div className="loading">Loading...</div>
  )
}

export default UserProfile
