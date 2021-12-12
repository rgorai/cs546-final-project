import { useEffect, useState } from 'react'
import axios from 'axios'

import MediaList from './MediaList'
import ApiError from '../errors/ApiError'
import MoviesNavBar from '../menus/MoviesNavBar'
import '../../styles/movies/moviesByGenre.css'

const AllMoviesPage = (props) => {
  const [moviesByGenre, setMoviesByGenre] = useState(null)
  const [error, setError] = useState(null)

  // get movies from server
  useEffect(() => {
    document.title = 'Movie Genres'
    axios
      .get('/api/movies/bygenre')
      .then((res) => setMoviesByGenre(res.data))
      .catch((e) => setError(e.response))
  }, [])

  // construct movie list ui
  const getList = () => {
    if (moviesByGenre.length === 0) return <div>Theres nothing here</div>
    const { data, _names } = moviesByGenre
    return Object.keys(data)
      .filter((k) => data[k].length > 0)
      .sort((k1, k2) => data[k2].length - data[k1].length)
      .map((k, i) => <MediaList key={i} name={_names[k]} mediaList={data[k]} />)
  }

  return (
    <>
      <MoviesNavBar />
      {error ? (
        <ApiError error={error} />
      ) : moviesByGenre ? (
        <div className="movies-bygenre-container">{getList()}</div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  )
}

export default AllMoviesPage
