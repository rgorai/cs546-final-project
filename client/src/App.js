import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import HomePage from './components/home/HomePage'
import NewUserForm from './components/users/NewUserForm'
import LoginPage from './components/home/LoginPage'
import AllMoviesPage from './components/movies/AllMoviesPage'
import AllshowsPage from './components/shows/AllShowsPage'
import MoviePage from './components/movies/MoviePage'
import ShowPage from './components/shows/ShowPage'
import UserProfile from './components/users/UserProfile'
import NavBar from './components/home/NavBar'
import ApiError from './components/errors/ApiError'

import { getCurrUser } from './services/authService'
import './styles/root.css'
import SearchPage from './components/search/SearchPage'

const App = () => {
  const [user, setUser] = useState(false)

  // get user session info
  useEffect(() => {
    const user = getCurrUser()
    if (user) setUser(user)
  }, [])

  return (
    <div className="App">
      <Router>
        <NavBar loggedIn={user} />

        <main>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route
              exact
              path="/signup"
              element={<NewUserForm loggedIn={user} />}
            />
            <Route
              exact
              path="/login"
              element={<LoginPage loggedIn={user} />}
            />
            <Route exact path="/profile" element={<UserProfile />} />
            <Route exact path="/movies" element={<AllMoviesPage />} />
            <Route exact path="/movies/:id" element={<MoviePage />} />
            <Route exact path="/shows" element={<AllshowsPage />} />
            <Route exact path="/shows/:id" element={<ShowPage />} />
            <Route exact path="/search/:query" element={<SearchPage />} />
            <Route
              exact
              path="*"
              element={<ApiError status="404" statusMessage="Not Found" />}
            />
          </Routes>
        </main>

        <footer>{/* This is the footer */}</footer>
      </Router>
    </div>
  )
}

export default App
