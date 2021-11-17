import { Link } from 'react-router-dom'
import './navBar.css'

const NavBar = (props) => {
  
  return (
    <nav className="nav-bar-container">
      <div className="website">
        <Link to="/">MovieHub</Link>
      </div>
      <ul className="nav-bar">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/posts">Shows</Link></li>
      </ul>
    </nav>
  )
}

export default NavBar