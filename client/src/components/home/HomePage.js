// import { useEffect, useState } from 'react'
import NewUserForm from '../users/NewUserForm'
import '../../styles/home/homePage.css'

const HomePage = (props) => {
  
  return (
    <div className="home-page-container">
      This is the home page
      <NewUserForm />
    </div>
  )
}

export default HomePage