import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { create } from '../../services/mediaService'

import { getUserProfile } from '../../services/userService'
import ApiError from '../errors/ApiError'
import '../../styles/users/userProfile.css'

/*
 * define error checking functions here
 *
 */

function checkIsString(s) {
  if (!s) throw 'Must provide all the inputs'
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsNumber(r) {
  r = parseInt(r)
  if (isNaN(r)) throw 'Given runtime is invalid'
}

function checkIsArray(arr) {
  if (!Array.isArray(arr)) {
    throw 'Given genres are invalid'
  } else if (arr.length === 0) {
    throw 'Given genres array is empty'
  }

  for (let x of arr) {
    checkIsString(x)
  }
}

const UserProfile = (props) => {
  const [user, setUser] = useState(null)
  // const [name, setName] = useState('')
  // const [releaseDate, setReleaseDate] = useState('')
  // const [mpa_rating, setMpaRating] = useState('')
  // const [runtime, setRuntime] = useState('')
  // const [genres, setGenres] = useState('')
  // const [description, setDescription] = useState('')
  // const [providers, setProviders] = useState('')
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
              user.watchlist.map((item) => <li>{item.name}</li>)
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
                    <label htmlFor="">Content Name:</label>
                    {item.contentName}
                  </p>
                  <p>
                    <label htmlFor="">Date of Review: </label>
                    {item.dateOfReview}
                  </p>
                  <p>
                    <label htmlFor="">Liked / Disliked: </label>
                    {item.like_dislike === 1 ? 'Liked' : 'Disliked'}
                  </p>
                  <p>
                    <label htmlFor="">Review: </label> {item.review}
                  </p>
                </div>
              ))
            )}
          </div>
          <button onClick={() => navigate('/profile/mediaRequest')}>
            Like To add an Item?
          </button>
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
