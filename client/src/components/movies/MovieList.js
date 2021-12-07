import MovieCard from './MovieCard'
import '../../styles/movies/movieList.css'

const MovieList = (props) => {
  return (
    <>
      <label>{props.name}</label>
      <div className="movie-list-container">
        {props.movieList
          .sort((_, m) => (m.poster_path ? 1 : -1))
          .map((movie, i) => (
            <MovieCard
              key={i}
              id={movie._id}
              posterPath={movie.poster_path}
              name={movie.name}
            />
          ))}
      </div>
    </>
  )
}

export default MovieList
