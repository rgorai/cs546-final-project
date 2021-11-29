import { useEffect, useState } from 'react'
import axios from 'axios'

import MovieList from './MovieList'
import ApiError from '../errors/ApiError'
import '../../styles/movies/allMoviesPage.css'

const AllMoviesPage = (props) => {
  const [movieList, setMovieList] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('/movies')
      .then((res) => setMovieList(res.data))
      .catch((e) => setError(e.response))
  }, [])

  return (
    <>
      {/* will be mapped to list of movies grouped by genre */}
      {error ? (
        <ApiError status={error.status} statusMessage={error.statusText} />
      ) : movieList ? (
        <div className="movies-page-container">
          <MovieList movieList={movieList.slice(0, 12)} />
          <MovieList movieList={movieList.slice(12, 25)} />
          <MovieList movieList={movieList.slice(25, 37)} />
          <MovieList movieList={movieList.slice(37)} />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllMoviesPage
