const express = require('express')
const router = express.Router()
const { addToWatchlist, deleteFromWatchlist } = require('../data/users')
const { verifyToken } = require('../middleware/auth')
const { getUser } = require('../data/users')

function checkIsString(s) {
  if (typeof s != 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

router.get('/profile', verifyToken, async (req, res) => {
  // error check
  // req.userId

  try {
    res.status(200).json(await getUser(req.userId))
  } catch (e) {
    res.sendStatus(500)
  }
})

// use verifyToken for things that need authentication:
// adding to watchlist
router.put('/:id', verifyToken, async (req, res) => {
  //error checking
  if (!req.params.id)
    throw 'You must specify an ID of the user to update the watchlist'
  let { name } = req.body

  if (!name) {
    res
      .status(400)
      .send('You must provide a movie/ TV show name to add to the watchlist')
  }

  try {
    checkIsString(name)
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    let user = await addToWatchlist(req.params.id, name)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(String(e))
  }
})
// removing from watchlist
router.delete('./:id', verifyToken, async (req, res) => {
  //error checking
  if (!req.params.id)
    throw 'You must specify an ID of the user to update the watchlist'
  let { name } = req.body

  if (!name) {
    res
      .status(400)
      .send(
        'You must provide a movie/ TV show name to delete from the watchlist'
      )
  }

  try {
    checkIsString(name)
  } catch (e) {
    return res.status(400).send(String(e))
  }

  try {
    let user = await deleteFromWatchlist(name)
    res.status(200).json(user)
  } catch (e) {
    res.status(400).send(String(e))
  }
})
// creating a review
// deleting a review
// liking/disliking a movie

module.exports = router
