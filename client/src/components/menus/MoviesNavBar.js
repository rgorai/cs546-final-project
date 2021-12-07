import { Link } from 'react-router-dom'

import FilterMenu from './FilterMenu'
import '../../styles/menus/moviesNavBar.css'

const MoviesNavBar = (props) => {
  // add query string if exists******
  const navLinks = [
    { name: 'All', link: '/movies/all' },
    { name: 'Genres', link: '/movies/bygenre' },
    { name: 'Providers', link: '/movies/byprovider' },
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
          {props.SortMenu}
        </div>
      </div>
    </div>
  )
}

export default MoviesNavBar
