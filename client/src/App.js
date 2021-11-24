import HomePage from './components/home/HomePage'
import NewUserForm from './components/users/NewUserForm'
import LoginPage from './components/home/LoginPage'
import MovieList from './components/movies/MovieList'
import ShowList from './components/shows/ShowList'
import MoviePage from './components/movies/MoviePage'
import UserProfile from './components/users/UserProfile'
import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import ReactSession from 'react-client-session/dist/ReactSession'

const App = () => {
  ReactSession.setStoreType('cookie')

  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/movies">Movies</Link></li>
            <li><Link to="/shows">Shows</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/signup" element={<NewUserForm />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/profile" element={<UserProfile />} />
            <Route exact path="/movies" element={<MovieList />} />
            <Route exact path="/movies/:id" element={<MoviePage />} />
            <Route exact path="/shows" element={<ShowList />} />
            <Route exact path="*" element={<div>not found</div>} />
          </Routes>
        </main>
        
      </Router>
    </div>
  )
}

export default App