import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import axios from 'axios'

import '../../styles/home/homePage.css'

import MediaList from '../movies/MediaList'

const HomePage = (props) => {
  const [movieList, setMovieList] = useState([])
  const [showList, setShowList] = useState([])

  useEffect(() => {
    document.title = 'MediaHub'
    axios
      .get('/api/movies/bytrending')
      .then((res) => {
        console.log(res.data)
        setMovieList(res.data)
      })
      // should ui if fetch fails
      .catch((e) => console.log('search fetch error: ', e))
    axios
      .get('/api/shows/bytrending')
      .then((res) => {
        console.log(res.data)
        setShowList(res.data)
      })
      .catch((e) => console.log(e))
  }, [])

  return (
    <div className=" card-background home-page-container">
      <h1>Welcome to MediaHub</h1>
      <h2>Your Streaming Guide for Movies and TV Shows</h2>
      <div className="home-media-list-container">
        <MediaList title="Top Movies" mediaList={movieList} />
        <MediaList title="Top Shows" mediaList={showList} />
      </div>
    </div>
  )
}

export default HomePage
