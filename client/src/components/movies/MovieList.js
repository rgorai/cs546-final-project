import MovieCard from './MovieCard'
import '../../styles/movies/movieList.css'

const MovieList = (props) => {
  return (
    <>
      <label>{props.genreName}</label>
      <div className="movie-list-container">
        {props.movieList
          .sort((_, m) => (m.posterPath ? 1 : -1))
          .map((movie, i) => (
            <MovieCard
              key={i}
              id={movie._id}
              posterPath={movie.posterPath}
              name={movie.name}
            />
          ))}
      </div>
    </>
  )
}

export default MovieList
