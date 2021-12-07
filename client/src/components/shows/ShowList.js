import ShowCard from './ShowCard'
import '../../styles/shows/showList.css'

const ShowList = (props) => {
  return (
    <>
      <label>{props.name}</label>
      <div className="show-list-container">
        {props.showList
          .sort((_, m) => (m.poster_path ? 1 : -1))
          .map((show, i) => (
            <ShowCard
              key={i}
              id={show._id}
              posterPath={show.poster_path}
              name={show.name}
            />
          ))}
      </div>
    </>
  )
}

export default ShowList
