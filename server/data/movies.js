const mongoCollections = require('../config/mongoCollections')
const movieCollection = mongoCollections.movies
const { ObjectId } = require('mongodb')

const create = async (
    name, 
    releaseDate, 
    certifications, 
    runtime,
    genres,
    description,
    posterPath,
    videos,
    streamingPlatforms,
  ) => {
  // error check

  // .results.find((e) => e.iso_3166_1 === 'US') to get MPAA rating
  // videos.results to get vids

  // add new movie to db
  const movies = await movieCollection()
  const insertRet = await movies.insertOne({
    name: name,
    releaseDate: releaseDate,
    certifications: certifications,
    runtime: runtime,
    genres: genres,
    description: description,
    posterPath: posterPath,
    videos: videos,
    streamingPlatforms: streamingPlatforms,
    overallRating: 0,
    reviews: []
  })

  // throw if insertion failed
  if (!insertRet.acknowledged)
    throw 'Error: failed to add new movie.'

  return await get(insertRet.insertedId.toString())
}

const get = async (movieId) => {
  // error check
  if (typeof(movieId) !== 'string' || movieId.length === 0 || movieId === ' '.repeat(movieId.length))
    throw 'Error: movieId must be a non-empty string.'
  
  // convert id to object
  try {
    movieId = ObjectId(movieId)
  } catch (e) {
    throw String(e)
  }

  // find restaurant
  const movies = await movieCollection()
  const movie = await movies.findOne({ _id: movieId })

  if (!movie) 
    throw 'Error: failed to find movie.'

  return { ...movie, _id: movie._id.toString() }
}

const getAll = async (x) => {
  // error check
  if (typeof(x) !== 'undefined')
    throw 'Error: no parameters should be given.'

  // get and return all restaurants
  const movies = await movieCollection()
  return await movies.find({}).map((e) => ({ 
    ...e, 
    _id: e._id.toString(),
  })).toArray()
}

const getByGenre = async (str) => {
  // error check

  // get all movies of given genre
  // mongo

}

module.exports = {
  create,
  get,
  getAll,
}