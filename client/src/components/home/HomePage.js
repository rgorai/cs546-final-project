// import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../styles/home/homePage.css'

const HomePage = (props) => {
  
  return (
    <div className="home-page-container">
      <Link to="/login">
        Login
      </Link>
      <br />
      <Link to="/signup">
        Signup
      </Link>
    </div>
  )
}

export default HomePage