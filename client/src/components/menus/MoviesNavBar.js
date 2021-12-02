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

  return (
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
        <SortMenu />
      </div>
    </div>
  )
}

export default MoviesNavBar