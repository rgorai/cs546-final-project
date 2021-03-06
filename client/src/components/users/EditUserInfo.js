/* eslint-disable no-throw-literal */
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUserProfile, updateUserProfile } from '../../services/userService'
import ApiError from '../errors/ApiError'
import '../../styles/users/editUserInfo.css'

function checkIsString(s) {
  if (!s) throw 'Must provide all the inputs'
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsName(s) {
  if (/[^a-zA-Z]/.test(s)) throw 'Given input is not only letters'
}

function checkIsPassword(s) {
  if (s.length < 8) throw 'Given password size is less than 8'
}

function checkIsConfirmPassword(cp, p) {
  if (p !== cp) throw 'Password does not match'
}

function checkIsEmail(s) {
  if (!/^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(s)) throw 'Given email id is invalid'
}

function checkIsUsername(s) {
  if (s.length < 4) throw 'Given username size is less than 4'
}

const EditUserProfile = (props) => {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [formError, setFormError] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  // request user profile
  useEffect(() => {
    document.title = 'Edit Profile'
    getUserProfile()
      .then((res) => setUser(res.data))
      .catch((e) => setError(e.response))
  }, [])

  // post new data
  const onFormSubmit = (e) => {
    e.preventDefault()

    try {
      checkIsString(firstName)
      checkIsString(lastName)
      checkIsString(email)
      checkIsString(username)
      checkIsString(password)
      checkIsString(confirmPassword)

      checkIsName(firstName)
      checkIsName(lastName)
      checkIsEmail(email)
      checkIsUsername(username)
      checkIsPassword(password)
      checkIsConfirmPassword(confirmPassword, password)
    } catch (e) {
      return setFormError(e)
    }

    updateUserProfile({
      firstName,
      lastName,
      email,
      username,
      password,
    })
      .then((_) => navigate(-1))
      .catch((e) => setFormError(e.response.data))
  }

  return error ? (
    <ApiError error={error} />
  ) : user ? (
    <div className="card-background edit-user-container">
      <h1>Edit Profile</h1>
      <form id="edit-user-form" onSubmit={onFormSubmit}>
        <div className="user-input-container">
          <input
            id="input-firstname"
            placeholder="John"
            type="text"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            autoFocus
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

        <button className="form-submit" type="submit" form="edit-user-form">
          Submit
        </button>

        {formError && <div className="form-error">{formError}</div>}
      </form>
    </div>
  ) : (
    <div className="loading">Loading...</div>
  )
}

export default EditUserProfile
