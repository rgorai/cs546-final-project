import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { getCurrUser } from '../../services/authService'
import { useNavigate, useLocation } from 'react-router-dom'

import {
  postItem,
  deleteItem,
  getUserProfile,
} from '../../services/userService'

import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'

import ApiError from '../errors/ApiError'
import ReviewForm from '../users/ReviewForm'
import ReviewList from '../users/ReviewList'
import ShowDetail from './ShowDetail'
import '../../styles/shows/showPage.css'

import Youtube from 'react-youtube'

const opts = {
  height: '390',
  width: '640',
  playersVars: {
    autoplay: 1,
  },
}

// error when invalid id typed in route
const ShowPage = (props) => {
  const { id: showId } = useParams()
  const [showData, setShowData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [addedToWatchlist, setAddedToWatchlist] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const currUser = getCurrUser()

  useEffect(() => {
    if (showData) document.title = showData.name
  }, [showData])

  useEffect(() => {
    // get user info
    getUserProfile().then((res) => setUserData(res.data))
    // request server with given movie id
    axios
      .get(`/api/shows/${showId}`)
      .then((res) => {
        setShowData(res.data)
        console.log(res.data)
      })
      .catch((e) => setError(e.response))
  }, [showId])

  // check if already added to watchlist
  useEffect(() => {
    setAddedToWatchlist(
      userData && userData.watchlist.find((e) => String(e._id) === showId)
    )
  }, [userData, showId])

  const handleWatchlist = (e) => {
    e.preventDefault()
    if (!currUser) navigate('/login', { state: { from: location.pathname } })
    else if (addedToWatchlist)
      deleteItem(showData._id)
        .then((_) => setAddedToWatchlist(false))
        .catch((e) => setError(e.response))
    else
      postItem(showData._id)
        .then((_) => setAddedToWatchlist(true))
        .catch((e) => setError(e.response))
  }

  return (
    <>
      {error ? (
        <ApiError error={error} />
      ) : showData ? (
        <div className="card-background show-page-container">
          <div className="flex-horizontal media-top-container">
            <img
              className="show-page-img"
              src={
                showData.poster_path
                  ? `https://image.tmdb.org/t/p/original${showData.poster_path}`
                  : process.env.PUBLIC_URL + '/images/not-found.jpg'
              }
              alt="Show Poster"
            />
            <div className="media-top-right-container">
              <h1 className="show-name">{showData.name}</h1>
              <div className="show-year">
                {moment(showData.release_date, 'YYYY-MM-DD').format('YYYY')}
              </div>
              <table className="show-info-container">
                <tbody>
                  <ShowDetail
                    label="MPA RATING"
                    data={showData.mpa_rating ? showData.mpa_rating : 'NR'}
                  />
                  <ShowDetail
                    label="NO. SEASONS"
                    data={showData.number_of_seasons}
                  />
                  <ShowDetail
                    label="NO. EPISODES"
                    data={showData.number_of_episodes}
                  />
                  <ShowDetail
                    label="GENRES"
                    data={showData.genres.map((e) => e.name).join(', ')}
                  />
                  <ShowDetail
                    label="PROVIDERS"
                    data={
                      showData.providers ? (
                        showData.providers.map((e, i) => (
                          <img
                            key={i}
                            className="media-provider-img"
                            src={`https://image.tmdb.org/t/p/original${e.logo_path}`}
                            alt={`${e.provider_name} icon`}
                            title={e.provider_name}
                          />
                        ))
                      ) : (
                        <div className="none-message">None</div>
                      )
                    }
                  />
                </tbody>
              </table>
              <h3>Description</h3>
              {showData.description ? (
                <div className="show-description">{showData.description}</div>
              ) : (
                <div className="none-message">No description available</div>
              )}
            </div>
          </div>

          <div className="media-bottom-container">
            <div className="media-taskbar">
              <button
                onClick={handleWatchlist}
                className={`watchlist-button ${
                  addedToWatchlist ? 'watchlist-remove' : 'watchlist-add'
                }`}
              >
                {addedToWatchlist
                  ? 'Remove from Watchlist'
                  : 'Add To Watchlist'}
              </button>
              <ReviewForm contentId={showId} contentName={showData.name} />
            </div>

            <h2>Trailer</h2>
            {showData.video ? (
              <Youtube videoId={showData.video.key} opts={opts} />
            ) : (
              <div className="none-message">No trailer available</div>
            )}

            <div className="flex-horizontal media-review-heading">
              <h2>User Reviews</h2>
              <h2 className="flex-horizontal">
                <FontAwesomeIcon icon={faThumbsUp} className="icon" size="2x" />
                <p>
                  {showData.overall_rating
                    ? `${Math.floor(showData.overall_rating)}%`
                    : 'No Rating'}
                </p>
              </h2>
            </div>
            <ReviewList reviews={showData.reviews} />
          </div>
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  )
}

export default ShowPage
