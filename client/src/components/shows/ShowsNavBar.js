import { Link } from 'react-router-dom'
import '../../styles/shows/showsNavBar.css'

const ShowsNavBar = (props) => {
  const navLinks = [
    { name: 'All', link: '/shows' },
    { name: 'Genres', link: '/shows/bygenre' },
    { name: 'Providers', link: '/shows/byprovider' },
  ]

  return (
    <div className="show-navbar-container">
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
  )
}

export default ShowsNavBar