import { Link } from 'react-router-dom'
import '../../styles/movies/moviesNavBar.css'

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
        <button>filter</button>
        <button>sort</button>
      </div>
    </div>
  )
}

export default MoviesNavBar
