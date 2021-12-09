import MovieCard from './MovieCard'
import '../../styles/movies/movieList.css'

const MovieList = (props) => {
  return (
    <div className="card-background media-list-wrapper">
      {props.name && <h2>{props.name}</h2>}
      <div className="media-list-container">
        {props.movieList.map((movie, i) => (
          <MovieCard
            key={i}
            id={movie._id}
            posterPath={movie.poster_path}
            name={movie.name}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList
