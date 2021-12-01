import MovieCard from './MovieCard'
import '../../styles/movies/movieList.css'

const MovieList = (props) => {
  return (
    <>
      <label>{props.genreName}</label>
      <div className="movie-list-container">
        {props.movieList &&
          props.movieList.map((movie, i) => (
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
