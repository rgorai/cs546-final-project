import HomePage from './components/home/HomePage'
import NewUserForm from './components/users/NewUserForm'
import LoginPage from './components/home/LoginPage'
import MovieList from './components/movies/MovieList'
import ShowList from './components/shows/ShowList'
import MoviePage from './components/movies/MoviePage'
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
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<NewUserForm />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies" element={<MovieList />} />
            <Route exact path="/movies/:id" element={<MoviePage />} />
            <Route path="/shows" element={<ShowList />} />
          </Routes>
        </main>
        
      </Router>
    </div>
  )
}

export default App