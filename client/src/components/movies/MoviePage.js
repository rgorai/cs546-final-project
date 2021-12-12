import { useEffect, useState, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import { getCurrUser } from '../../services/authService'
import {
  postItem,
  deleteItem,
  getUserProfile,
} from '../../services/userService'

import axios from 'axios'
import moment from 'moment'

import ApiError from '../errors/ApiError'
import ReviewForm from '../users/ReviewForm'
import ReviewList from '../users/ReviewList'
import MovieDetail from './MovieDetail'
import '../../styles/movies/moviePage.css'

import Youtube from 'react-youtube'

const opts = {
  height: '390',
  width: '100%',
  playersVars: {
    autoplay: 1,
  },
}

const MoviePage = (props) => {
  const { id: movieId } = useParams()
  const [movieData, setMovieData] = useState(null)
  const [userData, setUserData] = useState(null)
  const [error, setError] = useState(null)
  const [addedToWatchlist, setAddedToWatchlist] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const currUser = getCurrUser()

  useEffect(() => {
    if (movieData) document.title = movieData.name
  }, [movieData])

  useEffect(() => {
    // get user info
    getUserProfile().then((res) => setUserData(res.data))
    // .catch((e) => {
    //   console.log(e)
    //   setError(e.response)
    // })
    // request server with given movie id
    axios
      .get(`/api/movies/${movieId}`)
      .then((res) => {
        setMovieData(res.data)
        // remove later
        console.log(res.data)
      })
      .catch((e) => setError(e.response))
  }, [movieId])

  useEffect(() => {
    setAddedToWatchlist(
      userData && userData.watchlist.find((e) => String(e._id) === movieId)
    )
  }, [userData, movieId])

  // useEffect(() => {
  //   if (addedToWatchlist) {
  //     console.log('trying to remove')
  //     deleteItem(movieData._id)
  //       .then((_) => {
  //         // navigate('/')
  //         window.location.reload()
  //       })
  //       .catch((e) => setError(e.response))
  //   }
  //   else
  //     postItem(movieData._id)
  //       .then((_) => {
  //         // navigate('/')
  //         window.location.reload()
  //       })
  //       .catch((e) => setError(e.response))
  // }, [addedToWatchlist, movieData])

  const handleWatchlist = (e) => {
    e.preventDefault()
    if (!currUser) navigate('/login', { state: { from: location.pathname } })
    else if (addedToWatchlist) {
      console.log('trying to remove')
      deleteItem(movieData._id)
        .then((_) => {
          // navigate('/')
          // window.location.reload()
          setAddedToWatchlist(false)
        })
        .catch((e) => setError(e.response))
    } else {
      console.log('trying to add')
      postItem(movieData._id)
        .then((_) => {
          // navigate('/')
          // window.location.reload()
          setAddedToWatchlist(true)
        })
        .catch((e) => setError(e.response))
    }
  }

  return (
    <>
      {error ? (
        <ApiError error={error} />
      ) : movieData ? (
        <div className="card-background movie-page-container">
          <div className="flex-horizontal media-top-container">
            <img
              className="movie-page-img"
              src={
                movieData.poster_path
                  ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
                  : process.env.PUBLIC_URL + '/images/not-found.jpg'
              }
              alt="Movie Poster"
            />
            <div className="media-top-right-container">
              <h1 className="movie-name">{movieData.name}</h1>
              <div className="movie-year">
                {moment(movieData.release_date, 'YYYY-MM-DD').format('YYYY')}
              </div>
              <table className="movie-info-container">
                <tbody>
                  <MovieDetail
                    label="MPA RATING"
                    data={movieData.mpa_rating ? movieData.mpa_rating : 'NR'}
                  />
                  <MovieDetail
                    label="RUNTIME"
                    data={`${
                      Math.floor(movieData.runtime / 60) > 0
                        ? Math.floor(movieData.runtime / 60) + 'h '
                        : ''
                    }${movieData.runtime % 60}min`}
                  />
                  <MovieDetail
                    label="GENRES"
                    data={movieData.genres.map((e) => e.name).join(', ')}
                  />
                  <MovieDetail
                    label="PROVIDERS"
                    data={
                      movieData.providers ? (
                        movieData.providers.map((e, i) => (
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
              {movieData.description ? (
                <div className="movie-description">{movieData.description}</div>
              ) : (
                <div className="none-message">No description available</div>
              )}
            </div>
          </div>

          {/* <div className="add-to-watchlist"> */}
          <button onClick={handleWatchlist}>
            {addedToWatchlist ? 'Remove from Watchlist' : 'Add To Watchlist'}
          </button>
          {/* </div> */}

          <h2>Trailer</h2>
          {movieData.video ? (
            <div className="movie-trailer">
              <Youtube videoId={movieData.video.key} opts={opts} />
            </div>
          ) : (
            <div className="none-message">No trailer available</div>
          )}

          <div className="flex-horizontal media-review-heading">
            <h2>User Reviews</h2>
            <h2 className="flex-horizontal">
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="icon"
                id="thumbs-up"
                size="2x"
              />
              <p>
                {movieData.overall_rating
                  ? `${Math.floor(movieData.overall_rating)}%`
                  : 'No Rating'}
              </p>
            </h2>
          </div>
          <ReviewForm contentId={movieId} contentName={movieData.name} />
          <ReviewList reviews={movieData.reviews} />
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  )
}

export default MoviePage
