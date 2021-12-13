const mongoCollections = require('../config/mongoCollections')
const mediaCollection = mongoCollections.mediaRequest
const movieCollection = mongoCollections.movies
const showCollection = mongoCollections.shows
const { ObjectId } = require('mongodb')

function checkIsString(s) {
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsNumber(r) {
  if (isNaN(r)) throw 'Given runtime is invalid'
}

function checkIsArray(arr) {
  if (!Array.isArray(arr)) {
    throw 'Given genres are invalid'
  } else if (arr.length === 0) {
    throw 'Given genres are empty'
  }
}

const createByUser = async (
  name,
  releaseDate,
  certifications,
  genres,
  description,
  providers
) => {
  if (!name) throw 'media should have a name'
  if (!releaseDate) throw 'media should have a release date'
  if (!certifications) throw 'media should have certifications'
  if (!genres) throw 'media should have genres'
  if (!description) throw 'media should have description'
  if (!providers) throw 'media should have video'

  try {
    checkIsString(name)
    checkIsString(releaseDate)
    checkIsString(certifications)

    checkIsNumber(runtime)

    checkIsArray(genres)
    checkIsString(description)

    checkIsArray(providers)
  } catch (e) {
    throw String(e)
  }

  let currentDate = new Date()
  if (new Date(releaseDate) > currentDate)
    throw 'Release data cannot be a future date'

  // add new movie to db
  const requests = await mediaCollection()
  const movies = await movieCollection()
  const shows = await showCollection()

  // check if the movie already in the database
  let movie = await movies.findOne({ name: name, release_date: releaseDate })
  let show = await shows.findOne({ name: name, release_date: releaseDate })
  if (movie != null || show != null) {
    throw 'Media already in the database'
  }

  let request = await medias.findOne({ name: name, release_date: releaseDate })

  if (request != null) {
    throw 'Media already in the request list'
  }

  const insertRet = await requests.insertOne({
    name: name,
    release_date: releaseDate,
    mpa_rating: certifications,
    genres: genres,
    description: description,
    providers: providers,
  })

  // throw if insertion failed
  if (!insertRet.acknowledged) throw 'Error: failed to add new media.'

  return await get(insertRet.insertedId.toString())
}

const get = async (movieId) => {
  // error check
  if (
    typeof movieId !== 'string' ||
    movieId.length === 0 ||
    movieId === ' '.repeat(movieId.length)
  )
    throw 'Error: movieId must be a non-empty string.'

  // convert id to object
  try {
    movieId = ObjectId(movieId)
  } catch (e) {
    throw String(e)
  }

  // find movie
  const media = await mediaCollection()
  const movie = await media.findOne({ _id: movieId })

  if (!movie) throw 'Error: failed to find movie.'

  return { ...movie, _id: movie._id.toString() }
}

module.exports = {
  createByUser,
  get,
}
