import { Link } from 'react-router-dom'
import '../../styles/menus/showsNavBar.css'

const ShowsNavBar = (props) => {
  const navLinks = [
    { name: 'All', link: '/shows' },
    { name: 'Genres', link: '/shows/bygenre' },
    { name: 'Providers', link: '/shows/byprovider' },
  ]

  return (
    <div className="show-navbar-wrapper">
      <h2>{props.title}</h2>
      <div className="movie-navbar-container">
        <ul className="show-navbar">
          {navLinks.map((e, i) => (
            <li key={i}>
              <Link className="show-nav-item" to={e.link}>
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="show-ops-container">
          <button>filter</button>
          <button>sort</button>
        </div>
      </div>
    </div>
  )
}

export default ShowsNavBar
