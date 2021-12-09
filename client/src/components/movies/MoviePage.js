import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
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
  width: '640',
  playersVars: {
    autoplay: 1,
  },
}

const MoviePage = (props) => {
  const { id: movieId } = useParams()
  const [movieData, setMovieData] = useState(null)
  const [error, setError] = useState(null)

  // request server with given movie id
  useEffect(() => {
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
    if (movieData) document.title = movieData.name
  }, [movieData])

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
                {moment(movieData.release_date, 'YYYY-MM-DD').format(
                  'MM/DD/YYYY'
                )}
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
                    label="USER RATING"
                    data={Math.floor(movieData.overall_rating) + '%'}
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
          <h2>Trailer</h2>
          {movieData.video ? (
            <div className="movie-trailer">
              <Youtube videoId={movieData.video.key} opts={opts} />
            </div>
          ) : (
            <div className="none-message">No trailer available</div>
          )}

          <h2>User Reviews</h2>
          <ReviewForm contentId={movieId} />
          <ReviewList reviews={movieData.reviews} />
        </div>
      ) : (
        <div className="loading">Loading</div>
      )}
    </>
  )
}

export default MoviePage
