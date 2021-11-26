import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'

import HomePage from './components/home/HomePage'
import NewUserForm from './components/users/NewUserForm'
import LoginPage from './components/home/LoginPage'
import AllMoviesPage from './components/movies/AllMoviesPage'
import ShowList from './components/shows/ShowList'
import MoviePage from './components/movies/MoviePage'
import UserProfile from './components/users/UserProfile'
import NavBar from './components/home/NavBar'

import { getCurrUser } from './services/authService'
import './styles/root.css'


const App = () => {
  const [user, setUser] = useState(false)
  
  // get user session info
  useEffect(() => {
    const user = getCurrUser()  
    if (user)
      setUser(user)
  }, [])

  return (
    <div className="App">
      <Router>
        <NavBar loggedIn={user} />

        <main>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<NewUserForm loggedIn={user} />} />
            <Route exact path="/login" element={<LoginPage loggedIn={user} />} />
            <Route exact path="/profile" element={<UserProfile />} />
            <Route exact path="/movies" element={<AllMoviesPage />} />
            <Route exact path="/movies/:id" element={<MoviePage />} />
            <Route exact path="/shows" element={<ShowList />} />
            <Route exact path="*" element={<div>not found</div>} />
          </Routes>
        </main>

        <footer>
          {/* This is the footer */}
        </footer>
        
      </Router>
    </div>
  )
}

export default App