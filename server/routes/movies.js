const express = require('express')
const router = express.Router()
const { get, getAll, getByName, getByGenre } = require('../data/movies')

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
    res.status(404).json({ error: String(e) })
  }
})

router.get('/name/:name', async (req, res) => {
  try {
    let movie = await getByName(req.params.name)
    res.status(200).json(movie)
  } catch (e) {
    res.status(404).json({ error: e })
  }
})

router.get('/genre/:genre', async (req, res) => {
  try {
    let movie = await getByGenre(req.params.genre)
    res.status(200).json(movie)
  } catch (e) {
    res.status(404).json({ error: e })
  }
})

module.exports = router
