import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/home/homePage.css'

import MovieList from '../movies/MovieList'
import ShowList from '../shows/ShowList'

import '../../styles/movies/movieList.css'
import '../../styles/shows/showList.css'

const HomePage = (props) => {
  


  return (
    <div className="home-page-container">
      <h1>Welcome to MediaHub</h1>
      <h2>Your Streaming Guide for Movies and TV Shows</h2>
      <label>
        <h3>Now Trending</h3>
      </label>
      <label>
        <h4>Movies</h4>
      </label>
      <label>
        <h4>Shows</h4>
      </label>
      
    </div>
    
  )
}

export default HomePage
