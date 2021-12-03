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
  const compareNumbers = (a, b, name) => a[name] - b[name]
  const compareStrings = (a, b, name) => a[name].toLowerCase() - b[name].toLowerCase()
  const movieSortItems = [
    { text: 'Popularity', name:'overallRating', 
    compare: compareNumbers},
    { text: 'Title', name:'name', compare: compareStrings},
    { text: 'Release Date', name:'releaseDate'},
    { text: 'Runtime', name:'runtime', compare: compareNumbers},
    { text: 'Revenue', name:'revenue', compare: compareNumbers},
  ]

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
