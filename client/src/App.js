import HomePage from './components/home/HomePage'
import MovieList from './components/movies/MovieList'
import ShowList from './components/shows/ShowList'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import NavBar from './components/home/NavBar'

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/shows" element={<ShowList />} />
          </Routes>
        </main>
        
      </Router>
    </div>
  )
}

export default App