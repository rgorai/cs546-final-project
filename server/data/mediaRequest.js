const mongoCollections = require('../config/mongoCollections')
const mediaCollection = mongoCollections.mediaRequest
const movieCollection = mongoCollections.movies
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
  runtime,
  genres,
  description,
  posterPath,
  video,
  providers,
  revenue
) => {
  if (!name) throw 'movie should have a name'
  if (!releaseDate) throw 'movie should have a release date'
  if (!certifications) throw 'movie should have certifications'
  if (!runtime) throw 'movie should have runtime'
  if (!genres) throw 'movie should have genres'
  if (!description) throw 'movie should have description'
  //if(!posterPath) throw "movie should have posterPath"
  //if(!video) throw "movie should have video"
  if (!providers) throw 'movie should have video'
  //if(!revenue) throw "movie should have video"

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

  // add new movie to db
  const media = await mediaCollection()
  const movies = await movieCollection()

  // check if the movie already in the database
  let movie = await movies.findOne({ name: name, releaseDate: releaseDate })
  if (movie != null) {
    throw 'Movie already in the database'
  }

  const insertRet = await media.insertOne({
    name: name,
    release_date: releaseDate,
    mpa_rating: certifications,
    runtime: runtime,
    genres: genres,
    description: description,
    poster_path: posterPath,
    video: video,
    providers: providers,
    revenue: revenue,
    overall_rating: 0,
    reviews: [],
  })

  // throw if insertion failed
  if (!insertRet.acknowledged) throw 'Error: failed to add new movie.'

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
