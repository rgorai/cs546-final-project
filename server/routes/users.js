const express = require('express')
const { ConnectionPoolClosedEvent } = require('mongodb')
const router = express.Router()
const { create } = require('../data/users')

router.post('/', async (req, res) => {
  const { firstName, lastName, email } = req.body
  console.log(req.body)
  
  // error check

  // create new user
  try {
    const newUser = await create(firstName, lastName, email)
    res.status(200).json(newUser)
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

module.exports = router
