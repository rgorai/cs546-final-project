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
    <>
      {props.loggedIn ? (
        <div>You are already signed in.</div>
      ) : (
        <form id="login-form" onSubmit={onFormSubmit}>
          <label className="form-label" htmlFor="input-username">
            Username
          </label>
          <input
            id="input-username"
            className="form-input"
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="form-label" htmlFor="input-password">
            Password
          </label>
          <input
            id="input-password"
            className="form-input"
            placeholder="Password"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="form-submit" type="submit" form="login-form">
            Login
          </button>
        </form>
      )}
    </>
  )
}

export default LoginPage
