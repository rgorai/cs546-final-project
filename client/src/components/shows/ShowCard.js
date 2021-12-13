import { Link } from 'react-router-dom'
import '../../styles/shows/showCard.css'

const ShowCard = (props) => {
  return (
    <div className="show-card-container" title={props.name}>
      <Link to={`/shows/single/${props.id}`}>
        <img
          className="show-card-img"
          src={
            props.posterPath
              ? `https://image.tmdb.org/t/p/w342${props.posterPath}`
              : process.env.PUBLIC_URL + '/images/not-found.jpg'
          }
          alt={`'${props.name}' Show Poster`}
        />
      </Link>
    </div>
  )
}

export default ShowCard
