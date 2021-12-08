import { useEffect, useState } from 'react'
import { getUserProfile, updateUserProfile } from '../../services/userService'
import ApiError from '../errors/ApiError'
import '../../styles/users/userProfile.css'

const UserProfile = (props) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [firstName, setFirstName] = useState(null)
  const [lastName, setLastName] = useState(null)
  const [email, setEmail] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  // const currUser = getCurrUser()

  // request user profile
  useEffect(() => {
    document.title = 'Edit Profile'
    getUserProfile()
      .then((res) => setUser(res.data))
      .catch((e) => setError(e.response))
  }, [])

  // post new data
  const onFormSubmit = () => {
    updateUserProfile()
      .then((res) => setUser(res.data))
      .catch((e) => setError(e.response))
  }

  return (
    <div className="profile-container">
      {error ? (
        <ApiError error={error} />
      ) : user ? (
        <form id="user-profile-form" onSubmit={onFormSubmit}>
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
              id="input-confirm-password"
              className="form-input"
              placeholder="Confirm Password"
              type="password"
              name="confirmpassword"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label className="form-label" htmlFor="input-confirm-password">
              Confirm Password
            </label>
            <button className="form-submit" type="submit" form="new-user-form">
              Submit
            </button>
          </div>
        </form>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default UserProfile
