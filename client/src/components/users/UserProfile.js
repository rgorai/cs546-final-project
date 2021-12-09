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
          <label htmlFor="" className="desc-bold heading">
            My Watchlist :
          </label>
          <ul className="watchlist">
            {user.watchlist.length === 0 ? (
              <li>You haven't created any watchlist yet.</li>
            ) : (
              user.watchlist.map((item) => <li>{item}</li>)
            )}
          </ul>
          <div className="user-reviews">
            <label htmlFor="" className="desc-bold heading">
              My Reviews :
            </label>
            {user.reviews.length === 0 ? (
              <p>You haven't reviewed any entertainment programmes yet.</p>
            ) : (
              user.reviews.map((item) => (
                <div>
                  <p>
                    <label htmlFor="" className="desc-bold">
                      Movie / Show Name
                    </label>
                  </p>
                  <p>
                    <label htmlFor="">Date of Review: </label>{' '}
                    {item.dateOfReview}
                  </p>
                  <p>
                    <label htmlFor="">Liked / Disliked : </label>{' '}
                    {item.like_dislike === 1 ? 'Liked' : 'Disliked'}
                  </p>
                  <p>
                    {' '}
                    Review:
                    {item.review}
                  </p>
                </div>
              ))
            )}
          </div>
          <button onClick={() => navigate('/profile/edit')}>
            Edit Profile
          </button>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </div>
  )
}

export default UserProfile
