import ShowCard from './ShowCard'
import '../../styles/shows/showList.css'

const ShowList = (props) => {
  return (
    <>
      <label>{props.genre ? props.genre : '[Genre]'}</label>
      <div className="show-list-container">
        {props.showList &&
          props.showList.map((show, i) => (
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
