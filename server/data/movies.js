const mongoCollections = require('../config/mongoCollections')
const movieCollection = mongoCollections.movies
const { ObjectId } = require('mongodb')
const moviesGenreList = require('../tasks/data/movies_genre_list.json')

function checkIsString(s) {
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

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

const create = async (
  name,
  releaseDate,
  certifications,
  runtime,
  genres,
  description,
  posterPath,
  video,
  providers
) => {
  // error check
  if (!name) throw 'Movie should have a name'
  if (!releaseDate) throw 'Movie should have a release date'
  if (!runtime) throw 'Movie should have a runtime'
  if (!genres) throw 'Movie should have genres'

  // parse data
  name = name.trim()
  releaseDate = releaseDate.trim()
  runtime = parseInt(runtime)
  video = video.results.find((e) => e.type === 'Trailer')

  const certTemp = certifications.results.find((e) => e.iso_3166_1 === 'US')
  certifications =
    certTemp &&
    certTemp.release_dates.length > 0 &&
    certTemp.release_dates[0].length > 0
      ? certTemp.release_dates[0].certification
      : null

  providers = providers.results.US
  let streamTemp = []
  const streamKeys = ['flatrate', 'buy', 'rent', 'ads', 'free']
  if (providers)
    for (const k of streamKeys)
      if (providers[k]) streamTemp = streamTemp.concat(providers[k])
  streamTemp = streamTemp.filter(
    (e, i) => i === streamTemp.findIndex((f) => e.provider_id === f.provider_id)
  )
  providers = streamTemp.length > 0 ? streamTemp : null

  try {
    checkIsString(name)
    checkIsString(releaseDate)
    checkCertification(certifications)
    checkIsNumber(runtime)
    checkIsArray(genres)
  } catch (e) {
    throw String(e)
  }

  // add new movie to db
  const movies = await movieCollection()

  // check if the movie already in the database
  let movie = await movies.findOne({ name: name, releaseDate: releaseDate })
  if (movie != null) {
    throw 'Movie already in the database'
  }

  const insertRet = await movies.insertOne({
    name: name,
    releaseDate: releaseDate,
    mpaRating: certifications,
    runtime: runtime,
    genres: genres,
    description: description,
    posterPath: posterPath,
    video: video,
    providers: providers,
    overallRating: 0,
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
  const movies = await movieCollection()
  const movie = await movies.findOne({ _id: movieId })

  if (!movie) throw 'Error: failed to find movie.'

  return { ...movie, _id: movie._id.toString() }
}

const getAll = async (x) => {
  // error check
  if (typeof x !== 'undefined') throw 'Error: no parameters should be given.'

  // get and return all movies
  const movies = await movieCollection()
  return await movies
    .find({})
    .map((e) => ({
      ...e,
      _id: e._id.toString(),
    }))
    .toArray()
}

const getAllByGenre = async (x) => {
  // error check
  if (typeof x !== 'undefined') throw 'Error: no parameters should be given.'

  // start with map of genre id to genre name
  const moviesByGenre = {
    data: {},
    _names: moviesGenreList.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: curr.name,
      }),
      {}
    ),
  }

  // assign movies to each genre they have
  const movies = await getAll()
  for (const movie of movies)
    for (const genre of movie.genres)
      if (moviesByGenre.data[genre.id]) moviesByGenre.data[genre.id].push(movie)
      else moviesByGenre.data[genre.id] = [movie]

  return moviesByGenre
}

const getAllByProvider = async (x) => {
  // error check
  if (typeof x !== 'undefined') throw 'Error: no parameters should be given.'

  // assign movies to each provider they have
  const moviesByProvider = {
    data: {},
    _names: {},
  }
  const movies = await getAll()
  for (const movie of movies)
    if (movie.providers)
      for (const p of movie.providers)
        if (moviesByProvider.data[p.provider_id])
          moviesByProvider.data[p.provider_id].push(movie)
        else {
          moviesByProvider.data[p.provider_id] = [movie]
          moviesByProvider._names[p.provider_id] = p.provider_name
        }
  console.log(moviesByProvider)
  return moviesByProvider
}

const getByGenre = async (str) => {
  // error check
  if (!str) throw 'Must provide a genre'

  try {
    checkIsString(str)
  } catch (e) {
    throw String(e)
  }

  // get all movies of given genre
  const movies = await movieCollection()
  return await movies.find({ 'genres.name': { $eq: str } }).toArray()
}

const getByName = async (str) => {
  //error check
  if (!str) throw 'Must provide a movie name'

  try {
    checkIsString(str)
  } catch (e) {
    throw String(e)
  }

  const movies = await movieCollection()
  return await movies.find({ name: { $eq: str } }).toArray()
}

module.exports = {
  create,
  get,
  getAll,
  getAllByGenre,
  getAllByProvider,
  getByGenre,
  getByName,
}
