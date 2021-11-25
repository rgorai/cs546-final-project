import { Link } from 'react-router-dom'
import '../../styles/movies/movieCard.css'

const MovieCard = (props) => {
  return (
    <div className="movie-card-container">
      <Link to={`/movies/${props.id}`}>
        <img 
          className="movie-card-img"
          src={props.posterPath
            ? `https://image.tmdb.org/t/p/original${props.posterPath}`
            : process.env.PUBLIC_URL + '/images/not-found.jpg'
          }
          alt={`'${props.name}' Movie Poster`}
        />
      </Link>
    </div>
  )
}

export default MovieCard