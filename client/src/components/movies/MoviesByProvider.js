import { useEffect, useState } from 'react'
import axios from 'axios'

import MovieList from './MovieList'
import ApiError from '../errors/ApiError'
import MoviesNavBar from '../menus/MoviesNavBar'
import '../../styles/movies/moviesByProvider.css'

const MoviesByProvider = (props) => {
  const [moviesByProvider, setMoviesByProvider] = useState(null)
  const [error, setError] = useState(null)

  // get movies from server
  useEffect(() => {
    axios
      .get('/api/movies/byprovider')
      .then((res) => setMoviesByProvider(res.data))
      .catch((e) => setError(e.response))
  }, [])

  // construct movie list ui
  const getList = () => {
    if (moviesByProvider.length === 0) return <div>Theres nothing here</div>
    const { data, _names } = moviesByProvider
    return Object.keys(data)
      .filter((k) => data[k].length > 0)
      .sort((k1, k2) => data[k2].length - data[k1].length)
      .map((k, i) => <MovieList key={i} name={_names[k]} movieList={data[k]} />)
  }

  return (
    <>
      <MoviesNavBar title="Movies" />
      {error ? (
        <ApiError error={error} />
      ) : moviesByProvider ? (
        <div className="movies-bygenre-container">{getList()}</div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default MoviesByProvider
