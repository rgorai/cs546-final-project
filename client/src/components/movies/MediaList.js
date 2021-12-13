import MovieCard from './MovieCard'
import ShowCard from '../shows/ShowCard'
import '../../styles/movies/mediaList.css'

const MediaList = (props) => {
  return (
    <div className="card-background media-list-wrapper">
      {props.title && <h2>{props.title}</h2>}
      {props.mediaList.length === 0 ? (
        <div className="none-message">Nothing here</div>
      ) : (
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
      )}
    </div>
  )
}

export default MediaList
