import { Link, useLocation } from 'react-router-dom'
import '../../styles/menus/moviesNavBar.css'

const MoviesNavBar = (props) => {
  const location = useLocation()
  const navLinks = [
    { name: 'All', link: '/movies/all' },
    { name: 'Genres', link: '/movies/bygenre' },
    { name: 'Providers', link: '/movies/byprovider' },
  ]

  return (
    <div className="movie-navbar-wrapper">
      <div className="movie-navbar-container">
        <ul className="movie-navbar">
          {navLinks.map((e, i) => (
            <li key={i}>
              <Link
                className={`movie-nav-item ${
                  location.pathname === e.link ? 'media-active-nav' : ''
                }`}
                to={e.link}
              >
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
        {props.SortMenu}
      </div>
    </div>
  )
}

export default MoviesNavBar
