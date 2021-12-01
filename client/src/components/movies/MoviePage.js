import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import ApiError from '../errors/ApiError'
import '../../styles/movies/moviePage.css'

// error when invalid id typed in route

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
              movieData.posterPath
                ? `https://image.tmdb.org/t/p/original${movieData.posterPath}`
                : process.env.PUBLIC_URL + '/images/not-found.jpg'
            }
            alt="Movie Poster"
          />
          <div className="movie-name">{movieData.name}</div>
          <div className="movie-year">{movieData.releaseDate}</div>
          <div className="movie-mpa-rating">{movieData.mpaRating}</div>
          <div className="movie-description">{movieData.description}</div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default MoviePage
