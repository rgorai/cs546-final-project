import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/authService'

const NewUserForm = (props) => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

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
    <div>
      {props.loggedIn ? (
        <div>You are already signed in.</div>
      ) : (
        <form id="new-user-form" onSubmit={onFormSubmit}>
          <label className="form-label" htmlFor="input-firstname">
            First Name
          </label>
          <input
            id="input-firstname"
            className="form-input"
            placeholder="John"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="form-label" htmlFor="input-lastname">
            Last Name
          </label>
          <input
            id="input-lastname"
            className="form-input"
            placeholder="Doe"
            type="text"
            name="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="form-label" htmlFor="input-email">
            Email
          </label>
          <input
            id="input-email"
            className="form-input"
            placeholder="johndoe@example.com"
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className="form-label" htmlFor="input-username">
            Username
          </label>
          <input
            id="input-username"
            className="form-input"
            placeholder="Username"
            type="text"
            name="username"
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
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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

export default NewUserForm
