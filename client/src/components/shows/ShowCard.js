import { Link } from 'react-router-dom'
import '../../styles/shows/showCard.css'

const ShowCard = (props) => {
  return (
    <div className="show-card-container">
      <Link to={`/shows/${props.id}`}>
        <img 
          className="show-card-img"
          src={`https://image.tmdb.org/t/p/original${props.posterPath}`}
          alt={`'${props.name}' Show Poster`}
        />
      </Link>
    </div>
  )
}

export default ShowCard