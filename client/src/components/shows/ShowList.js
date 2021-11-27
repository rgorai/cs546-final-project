import ShowCard from './ShowCard'
import '../../styles/shows/showList.css'

const ShowList = (props) => {

  return (
    <div>
      {props.showList && props.showList.length === 0
        ? <div>Loading</div>
        : <div>
            <label>Genre</label>
            <div className="show-list-container">
              {props.showList.map((show, i) => (
                <ShowCard 
                  key={i}
                  id={show._id}
                  posterPath={show.posterPath}
                  name={show.name}
                />
              ))}
            </div>
          </div>
        }
    </div>
  )
}

export default ShowList