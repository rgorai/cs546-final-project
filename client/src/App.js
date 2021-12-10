import { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

import HomePage from './components/home/HomePage'
import SignupPage from './components/home/SignupPage'
import LoginPage from './components/home/LoginPage'
import NavBar from './components/menus/NavBar'
import UserProfile from './components/users/UserProfile'
import EditUserInfo from './components/users/EditUserInfo'
import MediaRequest from './components/users/MediaRequest'
import ApiError from './components/errors/ApiError'
import SearchPage from './components/search/SearchPage'

import AllMoviesPage from './components/movies/AllMoviesPage'
import MoviesByGenre from './components/movies/MoviesByGenre'
import MoviesByProvider from './components/movies/MoviesByProvider'
import MoviePage from './components/movies/MoviePage'

import AllShowsPage from './components/shows/AllShowsPage'
import ShowsByGenre from './components/shows/ShowsByGenre'
import ShowsByProvider from './components/shows/ShowsByProvider'
import ShowPage from './components/shows/ShowPage'

import { getCurrUser } from './services/authService'
import './styles/root.css'

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
            {/* homepage routes */}
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/home" element={<Navigate to="/" />} />
            <Route
              exact
              path="/signup"
              element={<SignupPage loggedIn={user} />}
            />
            <Route
              exact
              path="/login"
              element={<LoginPage loggedIn={user} />}
            />
            {/* add logout route? */}
            <Route exact path="/profile" element={<UserProfile />} />
            <Route exact path="/profile/edit" element={<EditUserInfo />} />
            <Route
              exact
              path="/profile/mediaRequest"
              element={<MediaRequest />}
            />

            {/* movies routes */}
            <Route
              exact
              path="/movies"
              element={<Navigate to="/movies/all" />}
            />
            {/* <Route
              exact
              path="/test"
              element={<Navigate to="/movies/all?sort=name&asc=false" />}
            /> */}
            <Route
              exact
              path="/movies/all"
              element={/*<ValidateMoviesQuery />*/ <AllMoviesPage />}
            />
            <Route exact path="/movies/bygenre" element={<MoviesByGenre />} />
            <Route
              exact
              path="/movies/byprovider"
              element={<MoviesByProvider />}
            />
            <Route exact path="/movies/single/:id" element={<MoviePage />} />

            <Route
              exact
              path="/shows/all"
              element={/*<ValidateShowsQuery />*/ <AllShowsPage />}
            />
            <Route exact path="/shows/bygenre" element={<ShowsByGenre />} />
            <Route
              exact
              path="/shows/byprovider"
              element={<ShowsByProvider />}
            />
            <Route exact path="/shows/single/:id" element={<ShowPage />} />

            {/* search routes */}
            <Route exact path="/search/:query" element={<SearchPage />} />

            {/* catch the rest */}
            <Route
              exact
              path="*"
              element={
                <ApiError
                  error={{
                    status: 404,
                    statusText: 'Not Found',
                    data: 'invalid react route',
                  }}
                />
              }
            />
          </Routes>
        </main>

        <footer>{/* This is the footer */}</footer>
      </Router>
    </div>
  )
}

export default App
