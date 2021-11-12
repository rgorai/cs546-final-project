import React, { useEffect, useState } from 'react'
import Movie from './Movie'
const axios = require('axios')

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    console.log('axios get')
    // axios.get('/movies')
    //   .then((movies) => setMovieList(movies))
    //   // ui if fetch fails
    //   .catch((e) => console.log('movie fetch error: ', e))
    fetch('/movies')
      .then((res) => res.json())
      .then((movies) => setMovieList(movies))
      // ui if fetch fails
      .catch((e) => console.log('movie fetch error: ', e))
  })
  
  return (
    <div className="movie-list-container">
      {movieList.map((movie, i) => (
        <Movie 
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