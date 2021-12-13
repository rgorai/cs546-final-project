import { useEffect, useState } from 'react'
import axios from 'axios'

import '../../styles/home/homePage.css'

import MediaList from '../movies/MediaList'
import ApiError from '../errors/ApiError'

const HomePage = (props) => {
  const [movieList, setMovieList] = useState(null)
  const [showList, setShowList] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'MediaHub'
    axios
      .get('/api/movies/bytrending')
      .then((res) => {
        console.log(res.data)
        setMovieList(res.data)
      })
      .catch((e) => setError(e.response))
    axios
      .get('/api/shows/bytrending')
      .then((res) => {
        console.log(res.data)
        setShowList(res.data)
      })
      .catch((e) => setError(e.response))
  }, [])

  return error ? (
    <ApiError error={error} />
  ) : movieList && showList ? (
    <div className="all-movies-container">
      <div className="card-background home-page-container">
        <h1>Welcome to MediaHub</h1>
        <h2>Your Streaming Guide for Movies and TV Shows</h2>
        <div className="home-media-list-container">
          <MediaList title="Top Movies" mediaList={movieList} />
          <MediaList title="Top Shows" mediaList={showList} />
        </div>
      </div>
    </div>
  ) : (
    <div className="loading">Loading...</div>
  )
}

export default HomePage
