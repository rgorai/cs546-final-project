import { Link, useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'
import { logout } from '../../services/authService'
import '../../styles/home/navBar.css'

const NavBar = (props) => {
  const navigate = useNavigate()

  return (
    <nav className="nav-bar-container">
      <div className="website-logo">
        <Link className="nav-item" to="/">MediaHub</Link>
      </div>
      <ul className="nav-bar">
        <li><Link className="nav-item" to="/">Home</Link></li>
        <li><Link className="nav-item" to="/movies">Movies</Link></li>
        <li><Link className="nav-item" to="/shows">Shows</Link></li>
      </ul>
      
      <SearchBar />

      {props.loggedIn
        ? <div>
            <button 
              onClick={() => navigate('/profile')}
              type="button"
            >
              Profile
            </button>

            <button 
              onClick={logout}
              type="button"
            >
              Logout
            </button>
          </div>
        : <div>
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
          </div>
      }  
    </nav>
  )
}

export default NavBar