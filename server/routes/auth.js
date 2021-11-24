const express = require('express')
const router = express.Router()
const { createUser, authenticateUser } = require('../data/users')
const { isLoggedIn } = require('../middleware/auth')

router.post('/signup', isLoggedIn, async (req, res) => {
  const { 
    firstName, 
    lastName, 
    email,
    username,
    password
  } = req.body
  
  // error check

  // create new user
  try {
    res.status(200).json(await createUser(
      firstName, 
      lastName, 
      email,
      username,
      password
    ))
  } catch (e) {
    res.status(400).send(String(e))
  }
})

router.post('/login', isLoggedIn, async (req, res) => {
  const { username, password } = req.body

  // error check

  // authenticate user
  try {
    const auth = await authenticateUser(username, password)
    if (auth.authenticated)
      res.status(200).json(auth)
    else 
      res.status(401).json({ error: 'Invalid username or password' })
  } catch (e) {
    res.status(500).send(String(e))
  }
})

module.exports = router
