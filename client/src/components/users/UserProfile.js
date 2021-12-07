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

  // const getWatchlist = () => {
  //   console.log(user)
  //   if (user.watchlist.length === 0)
  //     return <li>No Watchlist</li>
  //   return <li>in the get watchlist function</li>
  // }

  // const getReviews = () => {
  //   console.log(user)
  //   if (user.reviews.length === 0)
  //     return <li>No Reviews</li>
  //   user.reviews.forEach(review => {
  //     <ul>
  //       <li>review.reviewer</li>
  //       <li>review.dateOfReview</li>
  //       <li>review.review</li>
  //       <li>review.like_dislike</li>
  //     </ul>
  //   })
  // }

  return (
    <div className="profile-container">
      {error ? (
        <ApiError error={error} />
      ) : user ? (
        <div className="user-page-container">
          <div>
            [User Info Here (watchlist, reviews, liked movies?)]
            {/* <p>Watchlist</p> */}
            {/* <div className="watchlist">{getWatchlist()}</div> */}
            {/* <ul className="reviews">{getReviews()}</ul> */}
          </div>
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
