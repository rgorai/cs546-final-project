const express = require('express')
const router = express.Router()
const { get, getAll, getByName, getByGenre } = require('../data/movies')

function checkIsString(s) {
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

/*

function checkCertification(c) {
  let certifications = ['PG', 'PG-13', 'R', 'NC-17', null]
  if (certifications.indexOf(c) < 0) throw 'Given certification is invalid'
}

function checkIsNumber(r) {
  r = parseInt(r)
  if (isNaN(r)) throw 'Given runtime is invalid'
}

function checkIsArray(arr) {
  if (!Array.isArray(arr)) {
    throw 'Given genres are invalid'
  } else if (arr.length === 0) {
    throw 'Given genres are empty'
  }
}
*/

router.get('/', async (req, res) => {
  // error check
  //no checks

  // send all movies
  try {
    res.status(200).json(await getAll())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.get('/:id', async (req, res) => {
  let movieId = req.params.id
  // console.log(movieId)

  // error check

  if (
    typeof movieId !== 'string' ||
    movieId.length === 0 ||
    movieId === ' '.repeat(movieId.length)
  ) {
    res.status(400).send('movieId must be a non-empty string.')
    return
  }

  movieId = movieId.toLowerCase().trim()

  // send requested movie
  try {
    res.status(200).json(await get(movieId))
  } catch (e) {
    res.status(404).send(String(e))
  }
})

router.get('/name/:name', async (req, res) => {
  let movieName = req.params.name
  //error checking
  if (!movieName) throw 'Must provide a movie name'

  try {
    checkIsString(movieName)
  } catch (e) {
    res.status(404).send(String(e))
  }

  //movieName = movieName.toLowerCase().trim()

  try {
    let movie = await getByName(movieName)
    res.status(200).json(movie)
  } catch (e) {
    res.status(404).send(String(e))
  }
})

router.get('/genre/:genre', async (req, res) => {
  let genre = req.params.genre
  // error check
  if (!genre) throw 'Must provide a genre'

  try {
    checkIsString(genre)
  } catch (e) {
    res.status(404).send(String(e))
  }

  //genre = genre.toLowerCase().trim()

  try {
    let movie = await getByGenre(genre)
    res.status(200).json(movie)
  } catch (e) {
    res.status(404).send(String(e))
  }
})

module.exports = router
