const express = require('express')
const { verifyToken } = require('../middleware/auth')
const router = express.Router()
const {
  get,
  getAll,
  getAllByGenre,
  getAllByProvider,
  getByName,
  getByGenre,
  getByTrending,
} = require('../data/movies')

const { createByUser } = require('../data/mediaRequest')

function checkIsString(s) {
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsNumber(r) {
  r = parseInt(r)
  if (isNaN(r)) throw 'Given runtime is invalid'
}

function checkIsArray(arr) {
  if (!Array.isArray(arr)) {
    throw 'Given genres are invalid'
  } else if (arr.length === 0) {
    throw 'Given genres array is empty'
  }

  for (let x of arr) {
    checkIsString(x)
  }
}

router.get('/', async (req, res) => {
  // send all movies
  try {
    res.status(200).json(await getAll())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.get('/bygenre', async (req, res) => {
  // send all movies by genre
  try {
    res.status(200).json(await getAllByGenre())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.get('/byprovider', async (req, res) => {
  // send all movies by provider
  try {
    res.status(200).json(await getAllByProvider())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.get('/bytrending', async (req, res) => {
  // send all movies by genre
  try {
    res.status(200).json(await getByTrending())
  } catch (e) {
    res.status(500).send(String(e))
  }
})

router.get('/:id', async (req, res) => {
  let movieId = req.params.id

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

router.post('/', verifyToken, async (req, res) => {
  console.log('in the movie post')
  let movieInfo = req.body

  if (!movieInfo) {
    res.status(400).json({ error: 'You must provide data to create a movie' })
    return
  }

  if (!movieInfo.name) {
    res.status(400).json({ error: 'You must provide the name of the movie' })
    return
  }
  if (!movieInfo.releaseDate) {
    res
      .status(400)
      .json({ error: 'You must provide the release date of the movie' })
    return
  }
  if (!movieInfo.mpa_rating) {
    res.status(400).json({ error: 'You must provide genres of the movie' })
    return
  }
  if (!movieInfo.runtime) {
    res.status(400).json({ error: 'You must provide the runtime of the movie' })
    return
  }
  if (!movieInfo.genres) {
    res.status(400).json({ error: 'You must provide genres of the movie' })
    return
  }
  if (!movieInfo.description) {
    res.status(400).json({ error: 'You must provide description of the movie' })
    return
  }
  if (!movieInfo.providers) {
    res
      .status(400)
      .json({ error: 'You must provide the providers of the movie' })
    return
  }

  try {
    checkIsString(movieInfo.name)
    checkIsString(movieInfo.releaseDate)
    checkIsString(movieInfo.mpa_rating)

    checkIsNumber(movieInfo.runtime)

    checkIsArray(movieInfo.genres)
    checkIsString(movieInfo.description)

    checkIsArray(movieInfo.providers)
  } catch (e) {
    res.status(404).send(String(e))
  }

  let tmdb_id = null
  let poster_path = null
  let video = null
  let revenue = null

  try {
    const newMovie = await createByUser(
      movieInfo.name,
      movieInfo.releaseDate,
      movieInfo.mpa_rating,
      movieInfo.runtime,
      movieInfo.genres,
      movieInfo.description,
      poster_path,
      video,
      movieInfo.providers,
      revenue
    )
    res.json(newMovie)
  } catch (e) {
    res.sendStatus(500)
  }
})

module.exports = router
