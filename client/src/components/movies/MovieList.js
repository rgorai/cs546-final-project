import MovieCard from './MovieCard'
import '../../styles/movies/movieList.css'

const MovieList = (props) => {
  // const [movieList, setMovieList] = useState([])

  return (
    <>
      {props.movieList.length === 0 ? (
        <div>Loading</div>
      ) : (
        <>
          <label>[Genre]</label>
          <div className="movie-list-container">
            {props.movieList.map((movie, i) => (
              <MovieCard
                key={i}
                id={movie._id}
                posterPath={movie.posterPath}
                name={movie.name}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

export default MovieList
