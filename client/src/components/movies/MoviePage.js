import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/movies/moviePage.css'
const axios = require('axios')

// error when invalid id typed in route

const MoviePage = (props) => {
  const { id: movieId } = useParams()
  const [movieData, setMovieData] = useState({})

  useEffect(() => {
    axios.get(`/movies/${movieId}`)
      .then((res) => setMovieData(res.data))
      // should ui if fetch fails
      .catch((e) => console.log('movie fetch error: ', e))
  }, [movieId])  

  return (
    <div className="movie-page-container">
      <img 
        className="movie-page-img"
        src={`https://image.tmdb.org/t/p/original${movieData.posterPath}`}
        alt="Movie Poster"
      />
      <div>
        {movieData.name}
      </div>
      <div>
        {movieData.year}
      </div>
      <div>
        {movieData.mpaRating}
      </div>
      <div>
        {movieData.description}
      </div>
    </div>
  )
}

export default MoviePage