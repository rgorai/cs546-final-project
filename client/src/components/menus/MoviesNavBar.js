import { Link } from 'react-router-dom'

import FilterMenu from './FilterMenu'
import SortMenu from './SortMenu'
import '../../styles/menus/moviesNavBar.css'

const MoviesNavBar = (props) => {
  const navLinks = [
    { name: 'All', link: '/movies' },
    { name: 'Genres', link: '/movies/bygenre' },
    { name: 'Providers', link: '/movies/byprovider' },
  ]
  const compareNumbers = (a, b) => a - b
  const compareDates = (a, b) => Date.parse(a) - Date.parse(b)
  const compareStrings = (a, b) => a.toLowerCase() < b.toLowerCase() ? -1 : 1
  const movieSortItems = {
    name: { 
      text: 'Title',
      compare: compareStrings
    },
    overallRating: { 
      text: 'Popularity', 
      compare: compareNumbers
    },
    releaseDate: { 
      text: 'Release Date', 
      compare: compareDates
    },
    runtime: { 
      text: 'Runtime', 
      compare: compareNumbers
    },
    revenue: { 
      text: 'Revenue', 
      compare: compareNumbers
    },
  }

  return (
    <div className="movie-navbar-wrapper">
      <h2>{props.title}</h2>
      <div className="movie-navbar-container">
        <ul className="movie-navbar">
          {navLinks.map((e, i) => (
            <li key={i}>
              <Link className="movie-nav-item" to={e.link}>
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="movie-ops-container">
          <FilterMenu />
          <SortMenu items={movieSortItems} movies={props.movies} setMovies={props.setMovies} />
        </div>
      </div>
    </div>
  )
}

export default MoviesNavBar
