import { Link } from 'react-router-dom'
import '../../styles/movies/movieCard.css'

const MovieCard = (props) => {
  return (
    <div className="movie-card-container">
      <Link to={`/movies/${props.id}`}>
        <img 
          className="movie-card-img"
          src={`https://image.tmdb.org/t/p/original${props.posterPath}`}
          alt={`'${props.name}' Movie Poster`}
        />
      </Link>
    </div>
  )
}

export default MovieCard