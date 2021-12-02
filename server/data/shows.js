const mongoCollections = require('../config/mongoCollections')
const showCollection = mongoCollections.shows
const { ObjectId } = require('mongodb')

function checkIsString(s) {
  if (typeof s != 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsNumber(r) {
  r = parseInt(r)
  if (isNaN(r)) throw 'Given runtime is invalid'
}

function checkIsArray(arr) {
  if (!Array.isArray(arr)) {
    throw 'Given genres/ services are invalid'
  } else if (arr.length === 0) {
    throw 'Given genres/services are empty'
  }

  for (let x of arr) {
    checkIsString(x)
    x = x.trim()
  }
}

function checkIsUrl(url) {
  let s
  try {
    s = new URL(url)
  } catch (e) {
    throw 'Given url is invalid'
  }
}

function checkIsObject(obj) {
  if (typeof obj !== 'object') throw 'Given input is not an Object'
  if (obj == null || obj === undefined || Object.keys(obj).length === 0)
    throw 'Given Object is invalid'
}

function getObject(id) {
  let { ObjectId } = require('mongodb')
  let newObjId = ObjectId()
  let x = newObjId.toString()
  if (typeof id === 'object') {
    parsedId = id
  } else {
    checkIsString(id)
    if (!ObjectId.isValid(id)) {
      throw 'Given id is invalid'
    }
    parsedId = ObjectId(id)
  }

  return parsedId
}

const create = async (
  name,
  releaseDate,
  description,
  number_of_episodes,
  number_of_seasons,
  genres,
  posterPath,
  streamingPlatforms
) => {
  // error check

  if (name !== null) {
    try {
      checkIsString(name)
    } catch (e) {
      throw e
    }
  }

  if (releaseDate !== null) {
    try {
      checkIsString(releaseDate)
    } catch (e) {
      throw e
    }
  }

  if (description !== null) {
    try {
      checkIsString(description)
    } catch (e) {
      throw e
    }
  }

  if (number_of_episodes !== null) {
    try {
      checkIsNumber(number_of_episodes)
    } catch (e) {
      throw e
    }
  }

  if (number_of_seasons !== null) {
    try {
      checkIsNumber(number_of_seasons)
    } catch (e) {
      throw e
    }
  }

  if (genres !== null) {
    try {
      checkIsObject(genres)
    } catch (e) {
      throw e
    }
  }

  name = name.trim()
  releaseDate = parseInt(releaseDate)
  description = description.trim()
  number_of_seasons = parseInt(number_of_seasons)
  number_of_episodes = parseInt(number_of_episodes)

  // add new show to db
  const shows = await showCollection()
  let newShow = {
    name: name,
    releaseDate: releaseDate,
    description: description,
    number_of_seasons: number_of_seasons,
    number_of_episodes: number_of_episodes,
    genres: genres,
    posterPath: posterPath,
    streamingPlatforms: streamingPlatforms,
    overallRating: 0, //initializing overallRating to be 0 when a show is created
    reviews: [], //initializing review as empty array
  }
  // throw if insertion failed
  const insertRet = await shows.insertOne(newShow)
  if (insertRet.insertedCount === 0) throw 'Error: failed to add new show.'

  return await get(insertRet.insertedId.toString())
}

const get = async (showId) => {
  // error check
  if (
    typeof showId !== 'string' ||
    showId.length === 0 ||
    showId === ' '.repeat(showId.length)
  )
    throw 'Error: showId must be a non-empty string.'

  showId = showId.toLowerCase().trim()

  // convert id to object
  try {
    showId = ObjectId(showId)
  } catch (e) {
    throw String(e)
  }

  // find show
  const shows = await showCollection()
  const show = await shows.findOne({ _id: showId })

  if (!show) throw 'Error: failed to find show.'

  return { ...show, _id: show._id.toString() }
}

const getAll = async (x) => {
  // error check
  if (typeof x !== 'undefined') throw 'Error: no parameters should be given.'

  // get and return all shows
  const shows = await showCollection()
  return await shows
    .find({})
    .map((e) => ({
      ...e,
      _id: e._id.toString(),
    }))
    .toArray()
}

const getByGenre = async (str) => {
  // error check

  if (!str) throw 'Must provide a genre'
  if (
    typeof str !== 'string' ||
    str.length === 0 ||
    str === ' '.repeat(str.length)
  )
    throw 'Error: Genre name must be a non-empty string.'

  // get all shows of given genre
  const showsList = await getAll()
  let showsbyGenre = []
  showsList.forEach((e) => {
    if (e.genres.find((i) => i.name === genre)) {
      showsbyGenre.push(e)
    }
  })
  return showsbyGenre
}

const getByName = async (str) => {
  if (!str) throw 'Must provide a name'

  try {
    checkIsString(str)
  } catch (e) {
    throw e
  }

  str = str.toLowerCase().trim()

  const shows = await showCollection()

  return await shows.find({ name: { $eq: str } }).toArray()
}

module.exports = {
  create,
  get,
  getAll,
  getByGenre,
  getByName,
}

//Show object example: https://api.themoviedb.org/3/tv/1668?api_key=eafd486601fa7c42b1dd9d374c56f365&language=en-US
//Show Provider Object example: https://api.themoviedb.org/3/tv/1668/watch/providers?api_key=31cc954c3de9a91aecd102e07e4d4707
//Movie object example: https://api.themoviedb.org/3/movie/18?api_key=31cc954c3de9a91aecd102e07e4d4707&append_to_response=videos,release_dates
//Show provider object example: https://api.themoviedb.org/3/tv/1668/watch/providers?api_key=31cc954c3de9a91aecd102e07e4d4707
