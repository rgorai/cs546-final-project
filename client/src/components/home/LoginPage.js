import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'

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
    <div className="login-box">
      {props.loggedIn ? (
        <div>You are already signed in.</div>
      ) : (
        <form id="login-form" onSubmit={onFormSubmit}>
          <div className="user-box">
            <input
              id="input-username"
              className="form-input"
              placeholder="Username or Email"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label htmlFor="input-username">Username</label>
          </div>

          <div className="user-box">
            <input
              id="input-password"
              className="form-input"
              placeholder="Password"
              type="text"
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
