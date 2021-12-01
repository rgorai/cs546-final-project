import ShowCard from './ShowCard'
import '../../styles/shows/showList.css'

const ShowList = (props) => {
  return (
    <>
      <label>{props.genreName}</label>
      <div className="show-list-container">
        {props.showList
          .sort((_, m) => m.posterPath ? 1 : -1)
          .map((show, i) => (
            <ShowCard
              key={i}
              id={show._id}
              posterPath={show.posterPath}
              name={show.name}
          />
        ))}
      </div>
    </>
  )
}

export default ShowList
