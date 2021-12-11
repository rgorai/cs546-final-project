import ShowCard from './ShowCard'
import '../../styles/shows/showList.css'

const ShowList = (props) => {
  return (
    <div className="card-background media-list-wrapper">
      {props.name && <h2>{props.name}</h2>}
      <div className="media-list-container">
        {props.showList.map((show, i) => (
          <ShowCard
            key={i}
            id={show._id}
            posterPath={show.poster_path}
            name={show.name}
          />
        ))}
      </div>
    </div>
  )
}

export default ShowList
