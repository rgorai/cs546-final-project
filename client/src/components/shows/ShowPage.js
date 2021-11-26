import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../styles/shows/showPage.css'
import axios from 'axios'

// error when invalid id typed in route

const ShowPage = (props) => {
  const { id: showId } = useParams()
  const [showData, setShowData] = useState({})

  useEffect(() => {
    axios.get(`/shows/${showId}`)
      .then((res) => setShowData(res.data))
      // should ui if fetch fails
      .catch((e) => console.log('show fetch error: ', e))
  }, [showId])  
  
  return (
    <div className="show-page-container">
      <img 
        className="show-page-img"
        src={showData.posterPath
          ? `https://image.tmdb.org/t/p/original${showData.posterPath}`
          : process.env.PUBLIC_URL + '/images/not-found.jpg'
        }
        alt="Show Poster"
      />
      <div>
        {showData.name}
      </div>
      <div>
        {showData.releaseDate}
      </div>
      <div>
        {showData.description}
      </div>
      <div>
        Total number of Seasons: {showData.number_of_seasons}
      </div>
      <div>
        Total number of episodes: {showData.number_of_episodes}
      </div>
    </div>
  )
}

export default ShowPage