const express = require('express')
const router = express.Router()
const { get, getAll } = require('../data/movies')

router.get('/', async (req, res) => {
  // error check

  // send all movies
  try {
    res.status(200).json(await getAll())
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

router.get('/:id', async (req, res) => {
  const movieId = req.params.id
  
  // error check

  // send requested movie
  try {
    res.status(200).json(await get(movieId))
  } catch (e) {
    res.status(500).json({ error: String(e) })
  }
})

module.exports = router
