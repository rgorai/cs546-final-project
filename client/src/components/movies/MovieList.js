import React, { useEffect, useState } from 'react'
import MovieCard from './MovieCard'
const axios = require('axios')

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    axios.get('/movies')
      .then((res) => setMovieList(res.data))
      // ui if fetch fails
      .catch((e) => console.log('movie fetch error: ', e))
  })
  
  return (
    <div className="movie-list-container">
      {movieList.map((movie, i) => (
        <MovieCard 
          key={i}
          name={movie.name}
          year={movie.year}
          mpaRating={movie.mpaRating}
          description={movie.description}
        />
      ))}
    </div>
  )
}

export default MovieList