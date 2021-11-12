import React, { useEffect, useState } from 'react'
import Movie from './Movie'

const MovieList = (props) => {
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    // update to use axios
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
        />
      ))}
    </div>
  )
}

export default MovieList