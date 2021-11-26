import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/movies/moviePage.css'
// import notFound from '../../../public/not-found.jpg'
import axios from 'axios'

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

  console.log(process.env.PUBLIC_URL)
  
  return (
    <div className="movie-page-container">
      <img 
        className="movie-page-img"
        src={movieData.posterPath
          ? `https://image.tmdb.org/t/p/original${movieData.posterPath}`
          : process.env.PUBLIC_URL + '/images/not-found.jpg'
        }
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