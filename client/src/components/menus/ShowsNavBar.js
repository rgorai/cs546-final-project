import { Link, useLocation } from 'react-router-dom'
import '../../styles/menus/showsNavBar.css'

const ShowsNavBar = (props) => {
  const location = useLocation()
  const navLinks = [
    { name: 'All', link: '/shows/all' },
    { name: 'Genres', link: '/shows/bygenre' },
    { name: 'Providers', link: '/shows/byprovider' },
  ]

  return (
    <div className="show-navbar-wrapper">
      <div className="show-navbar-container">
        <ul className="show-navbar">
          {navLinks.map((e, i) => (
            <li key={i}>
              <Link
                className={`show-nav-item ${
                  location.pathname === e.link ? 'media-active-nav' : 'no'
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

export default ShowsNavBar
