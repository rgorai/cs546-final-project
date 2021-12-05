import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'
import '../../styles/home/loginPage.css'

const LoginPage = (props) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check
    // try using 'validations'

    // post data to server
    login(username, password)
      .then((_) => {
        navigate('/')
        window.location.reload()
      })
      .catch((e) => setError(e.response))
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

          <button type="submit" form="login-form">
            Login
          </button>
        </form>
      )}
    </div>
  )
}

export default LoginPage
