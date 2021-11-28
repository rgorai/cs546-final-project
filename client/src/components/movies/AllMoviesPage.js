import { useEffect, useState } from 'react'
import axios from 'axios'

import MovieList from './MovieList'
import '../../styles/movies/allMoviesPage.css'

const AllMoviesPage = (props) => {
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    axios
      .get('/movies')
      .then((res) => setMovieList(res.data))
      // should ui if fetch fails
      .catch((e) => console.log('movie fetch error: ', e))
  }, [])

  return (
    <div className="movies-page-container">
      {/* will be mapped to list of movies grouped by genre */}
      {movieList.length === 0 ? (
        <div>Loading</div>
      ) : (
        <>
          <MovieList movieList={movieList.slice(0, 12)} />
          <MovieList movieList={movieList.slice(12, 25)} />
          <MovieList movieList={movieList.slice(25, 37)} />
          <MovieList movieList={movieList.slice(37)} />
        </>
      )}
    </div>
  )
}

export default AllMoviesPage
