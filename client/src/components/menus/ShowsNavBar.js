import { Link } from 'react-router-dom'
import '../../styles/menus/showsNavBar.css'

const ShowsNavBar = (props) => {
  // add query string if exists******
  const navLinks = [
    { name: 'All', link: '/shows/all' },
    { name: 'Genres', link: '/shows/bygenre' },
    { name: 'Providers', link: '/shows/byprovider' },
  ]

  return (
    <div className="show-navbar-wrapper">
      <h2>{props.title}</h2>
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
        <div className="show-ops-container">{props.SortMenu}</div>
      </div>
    </div>
  )
}

export default ShowsNavBar
