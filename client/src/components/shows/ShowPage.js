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
        src={`https://image.tmdb.org/t/p/original${showData.posterPath}`}
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
    </div>
  )
}

export default ShowPage