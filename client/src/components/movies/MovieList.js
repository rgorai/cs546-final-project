import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
import axios from 'axios'

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    axios.get('/movies')
      .then((res) => setMovieList(res.data))
      // should ui if fetch fails
      .catch((e) => console.log('movie fetch error: ', e))
  }, [])
    
  return (
    <div className="movie-list-container">
      {movieList.length === 0
        ? <div>error</div>
        : movieList.map((movie, i) => (
            <MovieCard 
              key={i}
              id={movie._id}
              posterPath={movie.posterPath}
              name={movie.name}
            />
          ))
        }
    </div>
  )
}

export default MovieList