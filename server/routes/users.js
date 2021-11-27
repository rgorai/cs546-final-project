const express = require('express')
const { append } = require('express/lib/response')
const router = express.Router()
const { createUser, authenticateUser } = require('../data/users')
const { verifyToken } = require('../middleware/auth')

router.get('/', verifyToken, (req, res) => {
  // console.log(req.userId)
  res.status(200).send('you are authenticated.')
})

// use verifyToken for things that need authentication:
// adding to watchlist
// removing from watchlist
// creating a review
// deleting a review
// liking/disliking a movie

module.exports = router
