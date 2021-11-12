const mongoCollections = require('../config/mongoCollections')
const movieCollection = mongoCollections.movies
const { ObjectId } = require('mongodb')

const create = async (name, year, rating) => {
  // error check

  // add new movie to db
  const movies = await movieCollection()
  const insertRet = await movies.insertOne({
    firstName: firstName,
    lastName: lastName,
    email: email
  })

  // throw if insertion failed
  if (!insertRet.acknowledged)
    throw 'Error: failed to add new restaurant.'

  return await get(insertRet.insertedId.toString())
}

const get = async (movieId) => {
  // error check
  if (typeof(movieId) !== 'string' || movieId.length === 0 || movieId === ' '.repeat(movieId.length))
    throw 'Error: id must be a non-empty string.'
  
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

  return { 
    ...movie, 
    _id: movie._id.toString(),
    // reviews: restaurant.reviews.map((e) => (
    //   { ...e, _id: e._id.toString() }
    // ))
  }
}

module.exports = {
  create,
  get,
}