import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// import { useParams } from 'react-router-dom'
import axios from 'axios'

import '../../styles/home/homePage.css'

import MovieList from '../movies/MovieList'
import ShowList from '../shows/ShowList'

// import '../../styles/movies/movieList.css'
// import '../../styles/shows/showList.css'

const HomePage = (props) => {
  const [movieList, setMovieList] = useState([])
  const [showList, setShowList] = useState([])

  useEffect(() => {
    axios
      .get('/api/movies/bytrending')
      .then((res) => {
        console.log(res.data)
        setMovieList(res.data)

        axios
          .get('/api/shows/bytrending')
          .then((res2) => {
            console.log(res2.data)
            setShowList(res2.data)
          })
          .catch((e) => console.log(e))
      })
      // should ui if fetch fails
      .catch((e) => console.log('search fetch error: ', e))
  }, [])

  return (
    <div className="home-page-container">
      <h1>Welcome to MediaHub</h1>
      <h2>Your Streaming Guide for Movies and TV Shows</h2>
      <label>
        <h3>Now Trending top 5</h3>
        <div className="trending-rank">
          <h1>1</h1>
          <h1>2</h1>
          <h1>3</h1>
          <h1>4</h1>
          <h1>5</h1>
        </div>
      </label>
      <label>
        <h4>Movies:</h4>
        <MovieList movieList={movieList} />
      </label>
      <label>
        <h4>Shows:</h4>
        <ShowList showList={showList} />
      </label>
    </div>
  )
}

export default HomePage
