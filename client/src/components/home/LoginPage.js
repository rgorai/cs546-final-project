import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import '../../styles/home/loginPage.css'

/*
 * define error checking functions here
 *
 */

const LoginPage = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Login'
  }, [])

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check
    try {
      /* error checking functions */
      const X = null // placeholder
    } catch (e) {
      setError('Invalid username or password')
    }

    // post data to server
    login(username, password)
      .then((_) => {
        navigate('/')
        window.location.reload()
      })
      .catch((e) => setError(e.response.data)) // get error from server
  }

  return (
    <div className="login-container">
      {props.loggedIn ? (
        <div>You are already signed in.</div>
      ) : (
        <form id="login-form" onSubmit={onFormSubmit}>
          <div className="user-input-container">
            <input
              id="input-username"
              placeholder="Username or Email"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="input-username">Username</label>
          </div>

          <div className="user-input-container">
            <input
              id="input-password"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label htmlFor="input-password">Password</label>
          </div>

          {/* display error here */}
          {error ? <div className="login-error">{error}</div> : null}

          <button type="submit" form="login-form">
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default LoginPage
