import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/authService'
import '../../styles/users/newUserForm.css'

const SignupPage = (props) => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    document.title = 'Sign Up'
  }, [])

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check

    // post data to server
    signup(firstName, lastName, email, username, password)
      .then((_) => {
        navigate('/')
        window.location.reload()
      })
      // change to respond with ui
      .catch((e) => setError(e.response))
  }

  return (
    <div className="login-container">
      {props.loggedIn ? (
        <div>You are already signed in.</div>
      ) : (
        <form id="new-user-form" onSubmit={onFormSubmit}>
          <div className="user-input-container">
            <input
              id="input-firstname"
              placeholder="John"
              type="text"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="input-firstname">First Name</label>
          </div>

          <div className="user-input-container">
            <input
              id="input-lastname"
              className="form-input"
              placeholder="Doe"
              type="text"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label className="form-label" htmlFor="input-lastname">
              Last Name
            </label>
          </div>

          <div className="user-input-container">
            <input
              id="input-email"
              className="form-input"
              placeholder="johndoe@example.com"
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label className="form-label" htmlFor="input-email">
              Email
            </label>
          </div>

          <div className="user-input-container">
            <input
              id="input-username"
              className="form-input"
              placeholder="Username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label className="form-label" htmlFor="input-username">
              Username
            </label>
          </div>

          <div className="user-input-container">
            <input
              id="input-password"
              className="form-input"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="input-password">
              Password
            </label>
          </div>

          <div className="user-input-container">
            <input
              id="input-password-confirm"
              className="form-input"
              placeholder="Confirm Password"
              type="password"
              name="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="input-password-confirm">
              Confirm Password
            </label>
          </div>

          <button className="form-reset" type="reset" form="new-user-form">
            Reset
          </button>

          <button className="form-submit" type="submit" form="new-user-form">
            Submit
          </button>
        </form>
      )}
    </div>
  )
}

export default SignupPage
