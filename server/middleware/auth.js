const jwt = require('jsonwebtoken')
const config = require('../config/authConfig')
const { createUser, authenticateUser } = require('../data/users')

const verifyToken = (req, res, next) => {
  const { access_token } = req.headers

  // ensure token exists
  if (!access_token)
    return res.status(403).json({ message: 'No token provided' })
  
  // validate token
  jwt.verify(access_token, config.secret, (error, decoded) => {
    if (error)
      return res.status(401).json({ message: 'Unauthorized' })
    req.userId = decoded.id
    next()
  })
}

const isLoggedIn = (req, res, next) => {

}

module.exports = {
  verifyToken
}