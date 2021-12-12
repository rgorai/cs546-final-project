import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { create } from '../../services/mediaService'

import { getUserProfile } from '../../services/userService'
import ApiError from '../errors/ApiError'
//import '../../styles/users/userProfile.css'
import '../../styles/users/mediaRequest.css'
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

const MediaRequest = (props) => {
  const [user, setUser] = useState(null)
  const [name, setName] = useState('')
  const [releaseDate, setReleaseDate] = useState('')
  const [mpa_rating, setMpaRating] = useState('')
  const [runtime, setRuntime] = useState('')
  const [genres, setGenres] = useState('')
  const [description, setDescription] = useState('')
  const [providers, setProviders] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  // request user profile
  useEffect(() => {
    document.title = 'Profile'
    getUserProfile()
      .then((res) => setUser(res.data))
      .catch((e) => setError(e.response))
  }, [])

  const onFormSubmit = (e) => {
    e.preventDefault()

    //convert genres and providers to array
    let arrGenres = genres.split(',')
    let arrProviders = providers.split(',')

    // error check
    try {
      checkIsString(name)
      checkIsString(releaseDate)
      checkIsString(mpa_rating)
      checkIsString(description)

      checkIsString(runtime)

      checkIsArray(arrGenres)
      checkIsArray(arrProviders)
    } catch (e) {
      return setError(e)
    }

    // post data to server
    create(
      name,
      releaseDate,
      mpa_rating,
      description,
      runtime,
      arrGenres,
      arrProviders
    )
      .then((_) => navigate(-1))
      .catch((e) => setError(e.response.data))
  }

  return (
    <div className="media-request-container">
      <h2>Like to add a movie?</h2>
      <form id="user-media-request" onSubmit={onFormSubmit}>
        {/* display error here */}

        {error ? <div className="login-error">{error}</div> : null}

        <div className="user-input-container">
          <input
            id="input-name"
            placeholder="Movie Name"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="input-name">Movie Name</label>
        </div>

        <div className="user-input-container">
          <input
            id="input-releaseDate"
            className="form-input"
            placeholder="Release Date"
            type="text"
            name="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
          />
          <label className="form-label" htmlFor="input-releaseDate">
            Release date
          </label>
        </div>

        <div className="user-input-container">
          <input
            id="input-rating"
            className="form-input"
            placeholder="Rating"
            type="text"
            name="mpa_rating"
            value={mpa_rating}
            onChange={(e) => setMpaRating(e.target.value)}
          />
          <label className="form-label" htmlFor="input-rating">
            Rating
          </label>
        </div>

        <div className="user-input-container">
          <input
            id="input-runtime"
            className="form-input"
            placeholder="Runtime"
            type="text"
            name="runtime"
            value={runtime}
            onChange={(e) => setRuntime(e.target.value)}
          />
          <label className="form-label" htmlFor="input-runtime">
            Runtime
          </label>
        </div>

        <div className="user-input-container">
          <input
            id="input-genres"
            className="form-input"
            placeholder="Enter ',' between inputs"
            type="text"
            name="genres"
            value={genres}
            onChange={(e) => setGenres(e.target.value)}
          />
          <label className="form-label" htmlFor="input-genres">
            Genres
          </label>
        </div>

        <div className="user-input-container">
          <input
            id="input-providers"
            className="form-input"
            placeholder="Enter ',' between inputs"
            type="text"
            name="providers"
            value={providers}
            onChange={(e) => setProviders(e.target.value)}
          />
          <label className="form-label" htmlFor="input-providers">
            Providers
          </label>
        </div>

        <div className="user-input-container">
          <input
            id="input-description"
            className="form-input"
            placeholder="Description"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <label className="form-label" htmlFor="input-description">
            Description
          </label>
        </div>

        {error ? <div className="login-error">{error}</div> : null}

        <button className="form-submit" type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}

export default MediaRequest
