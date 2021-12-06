import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import ApiError from '../errors/ApiError'
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

  return (
    <>
      {error ? (
        <ApiError error={error} />
      ) : movieData ? (
        <div className="movie-page-container">
          <img
            className="movie-page-img"
            src={
              movieData.poster_path
                ? `https://image.tmdb.org/t/p/original${movieData.poster_path}`
                : process.env.PUBLIC_URL + '/images/not-found.jpg'
            }
            alt="Movie Poster"
          />
          <div className="movie-name">{movieData.name}</div>
          <div className="movie-year">{movieData.release_date}</div>
          <div className="movie-mpa-rating">
            {movieData.mpa_rating ? movieData.mpa_rating : 'NR'}
          </div>
          <div className="movie-description">{movieData.description}</div>
          <div>
            {movieData.video ? (
              <Youtube videoId={movieData.video.key} opts={opts} />
            ) : (
              <div>No Trailer Available</div>
            )}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default MoviePage
