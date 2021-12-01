import { useEffect, useState } from 'react'
import axios from 'axios'

import MovieCard from './MovieCard'
import ApiError from '../errors/ApiError'
import MoviesNavBar from './MoviesNavBar'
import '../../styles/movies/allMoviesPage.css'

const AllMoviesPage = (props) => {
  const [movies, setMovies] = useState(null)
  const [error, setError] = useState(null)

  // get movies from server
  useEffect(() => {
    axios
      .get('/api/movies')
      .then((res) => setMovies(res.data))
      .catch((e) => setError(e.response))
  }, [])

  const getList = () => {
    if (movies.length === 0) return <div>Theres nothing here</div>

    return movies
      .sort((_, m) => (m.posterPath ? 1 : -1))
      .map((movie, i) => (
        <MovieCard
          key={i}
          id={movie._id}
          posterPath={movie.posterPath}
          name={movie.name}
        />
      ))
  }

  return (
    <>
      <MoviesNavBar />
      {error ? (
        <ApiError error={error} />
      ) : movies ? (
        <div className="all-movies-container">{getList()}</div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllMoviesPage
