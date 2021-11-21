const express = require('express')
const { ConnectionPoolClosedEvent } = require('mongodb')
const router = express.Router()
const { create, authenticate } = require('../data/users')

router.post('/', async (req, res) => {
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
    res.status(200).json(await create(
      firstName, 
      lastName, 
      email,
      username,
      password
    ))
  } catch (e) {
    res.status(400).json({ error: String(e) })
  }
})

router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body
  
  // error check

  // authenticate user
  try {
    res.status(200).json(await authenticate(username, password))
  } catch (e) {
    res.status(500)
  }
})

module.exports = router
