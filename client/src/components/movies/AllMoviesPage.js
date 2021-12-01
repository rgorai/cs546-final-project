import { useEffect, useState } from 'react'
import axios from 'axios'

import MovieList from './MovieList'
import ApiError from '../errors/ApiError'
import '../../styles/movies/allMoviesPage.css'

const AllMoviesPage = (props) => {
  const [moviesByGenre, setMoviesByGenre] = useState(null)
  const [error, setError] = useState(null)

  // get movies from server
  useEffect(() => {
    axios
      .get('/movies/bygenre')
      .then((res) => setMoviesByGenre(res.data))
      .catch((e) => setError(e.response))
  }, [])

  const getGenreList = (moviesByGenre) => {
    if (moviesByGenre.length === 0) return <div>Theres nothing here</div>

    const { data, _names } = moviesByGenre
    return Object.keys(data)
      .filter((k) => data[k].length > 0)
      .sort((k1, k2) => data[k2].length - data[k1].length)
      .map((k, i) => (
        <MovieList key={i} genreName={_names[k]} movieList={data[k]} />
      ))
  }

  return (
    <>
      {error ? (
        <ApiError error={error} />
      ) : moviesByGenre ? (
        <div className="movies-page-container">
          {getGenreList(moviesByGenre)}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllMoviesPage
