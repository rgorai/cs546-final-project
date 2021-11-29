import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import ApiError from '../errors/ApiError'
import '../../styles/shows/showPage.css'

// error when invalid id typed in route

const ShowPage = (props) => {
  const { id: showId } = useParams()
  const [showData, setShowData] = useState(null)
  const [error, setError] = useState(null)

  // request server with given movie id
  useEffect(() => {
    axios
      .get(`/shows/${showId}`)
      .then((res) => setShowData(res.data))
      .catch((e) => setError(e.response))
  }, [showId])

  return (
    <>
      {error ? (
        <ApiError status={error.status} statusMessage={error.statusText} />
      ) : showData ? (
        <div className="show-page-container">
          <img
            className="show-page-img"
            src={
              showData.posterPath
                ? `https://image.tmdb.org/t/p/original${showData.posterPath}`
                : process.env.PUBLIC_URL + '/images/not-found.jpg'
            }
            alt="Show Poster"
          />
          <div className="show-name">{showData.name}</div>
          <div className="show-year">{showData.releaseDate}</div>
          <div className="show-description">{showData.description}</div>
          <div className="show-seasons">
            Total number of Seasons: {showData.number_of_seasons}
          </div>
          <div className="show-episodes">
            Total number of episodes: {showData.number_of_episodes}
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default ShowPage
