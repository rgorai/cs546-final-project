import { Link, useNavigate } from 'react-router-dom'
import SearchBar from '../search/SearchBar'
// import AutoComplete from '../search/AutoComplete'
import { logout } from '../../services/authService'
import '../../styles/menus/navBar.css'

const NavBar = (props) => {
  const navigate = useNavigate()

  const navLinks = [
    { name: 'Home', link: '/' },
    { name: 'Movies', link: '/movies/all' },
    { name: 'Shows', link: '/shows/all' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className="navbar-container">
      <div className="website-logo">
        <Link className="nav-item" to="/">
          MediaHub
        </Link>
      </div>
      <ul className="navbar">
        {navLinks.map((e, i) => (
          <li key={i}>
            <Link className="nav-item" to={e.link}>
              {e.name}
            </Link>
          </li>
        ))}
      </ul>

      <SearchBar />
      {/* <AutoComplete /> */}

      <div className="navbar-button-container">
        {props.loggedIn ? (
          <>
            <button onClick={() => navigate('/profile')} type="button">
              Profile
            </button>

            <button onClick={handleLogout} type="button">
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              id="login-button"
              onClick={() => navigate('/login')}
              type="button"
            >
              Login
            </button>

            <button
              id="signup-button"
              onClick={() => navigate('/signup')}
              type="button"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

export default NavBar
