import { Link, useNavigate, useLocation } from 'react-router-dom'
import SearchBar from '../search/SearchBar'
import { logout } from '../../services/authService'
import '../../styles/menus/navBar.css'

const NavBar = (props) => {
  const navigate = useNavigate()
  const location = useLocation()

  const navLinks = [
    { name: 'HOME', link: '/home' },
    { name: 'MOVIES', link: '/movies/all' },
    { name: 'SHOWS', link: '/shows/all' },
  ]

  const handleLogout = () => {
    logout()
    navigate('/')
    window.location.reload()
  }

  return (
    <nav className="navbar-container">
      <div className="flex-horizontal">
        <Link className="flex-horizontal website-logo" to="/">
          <img
            className="website-logo-img"
            src={process.env.PUBLIC_URL + '/images/website-logo.png'}
            alt="MediaHub Logo"
          />
          <div>MediaHub</div>
        </Link>
        <ul className="flex-horizontal navbar">
          {navLinks.map((e, i) => (
            <li key={i}>
              <Link
                className={`nav-item ${
                  location.pathname.includes(e.name.toLowerCase())
                    ? 'active-nav'
                    : 'no'
                }`}
                to={e.link}
              >
                {e.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <SearchBar />

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
