import MovieCard from './MovieCard'
import ShowCard from '../shows/ShowCard'
import '../../styles/movies/mediaList.css'

const MediaList = (props) => {
  return (
    <div className="card-background media-list-wrapper">
      <h1></h1>
      {props.title && <h2>{props.title}</h2>}
      <div className="media-list-container">
        {props.mediaList.map((media, i) =>
          media.isMovie ? (
            <MovieCard
              key={i}
              id={media._id}
              posterPath={media.poster_path}
              name={media.name}
            />
          ) : (
            <ShowCard
              key={i}
              id={media._id}
              posterPath={media.poster_path}
              name={media.name}
            />
          )
        )}
      </div>
    </div>
  )
}

export default MediaList
