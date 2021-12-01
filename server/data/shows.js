const mongoCollections = require('../config/mongoCollections')
const showCollection = mongoCollections.shows
const { ObjectId } = require('mongodb')

function checkIsString(s) {
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsArray(arr) {
  if (!Array.isArray(arr)) {
    throw 'Given genres are invalid'
  } else if (arr.length === 0) {
    throw 'Given genres are empty'
  }
}

//func to create a new tv show
const create = async (
  name,
  releaseDate,
  description,
  number_of_seasons,
  number_of_episodes,
  genres,
  posterPath,
  video,
  streamingPlatforms
) => {
  // error check
  if (!name) throw 'Show should have a name'
  if (!releaseDate) throw 'Show should have a release date'
  if (!number_of_seasons) throw 'Show should have the number of seasons'
  if (!number_of_episodes) throw 'Show should have the number of episodes'
  if (!genres) throw 'Show should have genres'

  // parse data
  name = name.trim()
  releaseDate = releaseDate.trim()
  number_of_seasons = parseInt(number_of_seasons)
  number_of_episodes = parseInt(number_of_episodes)
  video = video.results.find((e) => e.type === 'Trailer')

  streamingPlatforms = streamingPlatforms.results.US
  let streamTemp = []
  const streamKeys = ['flatrate', 'buy', 'rent', 'ads', 'free']
  if (streamingPlatforms)
    for (const k of streamKeys)
      if (streamingPlatforms[k])
        streamTemp = streamTemp.concat(streamingPlatforms[k])
  streamTemp = streamTemp.filter(
    (e, i) => i === streamTemp.findIndex((f) => e.provider_id === f.provider_id)
  )
  streamingPlatforms = streamTemp.length > 0 ? streamTemp : null

  try {
    checkIsString(name)
    checkIsString(releaseDate)
    checkIsArray(genres)
    if (isNaN(number_of_seasons)) throw 'Given season number is invalid'
    if (isNaN(number_of_episodes)) throw 'Given episode number is invalid'
  } catch (e) {
    throw String(e)
  }
  
  // add new show to db
  const shows = await showCollection()

  // check if the show already in the database
  let show = await shows.findOne({ name: name, releaseDate: releaseDate })
  if (show != null) {
    throw 'Show already in the database'
  }

  const insertRet = await shows.insertOne({
    name: name,
    releaseDate: releaseDate,
    description: description,
    number_of_seasons: number_of_seasons,
    number_of_episodes: number_of_episodes,
    genres: genres,
    posterPath: posterPath,
    video: video,
    streamingPlatforms: streamingPlatforms,
    overallRating: 0, //initializing overallRating to be 0 when a show is created
    reviews: [], //initializing review as empty array
  })

  // throw if insertion failed
  if (!insertRet.acknowledged) throw 'Error: failed to add new show.'

  return await get(insertRet.insertedId.toString())
}

//func to get tv shows with id
const get = async (showId) => {
  // error check
  if (
    typeof showId !== 'string' ||
    showId.length === 0 ||
    showId === ' '.repeat(showId.length)
  )
    throw 'Error: showId must be a non-empty string.'

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

//func to get all tv shows
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

//func to get all tv shows of a particular genre
const getByGenre = async (str) => {
  // error check
  if (!str) throw 'Must provide a genre'

  try {
    checkIsString(str)
  } catch (e) {
    throw String(e)
  }

  const shows = await showCollection()
  return await shows.find({ 'genres.name': { $eq: str } }).toArray()
}
// const getByGenre = async (str) => {
//   // error check

//   if (!str) throw 'Must provide a genre'
//   if (
//     typeof str !== 'string' ||
//     str.length === 0 ||
//     str === ' '.repeat(str.length)
//   )
//     throw 'Error: Genre name must be a non-empty string.'

//   // get all shows of given genre
//   const showsList = await getAll()
//   let showsbyGenre = []
//   showsList.forEach((e) => {
//     if (e.genres.find((i) => i.name === genre)) {
//       showsbyGenre.push(e)
//     }
//   })
//   return showsbyGenre
// }

//func to get tv show of a specific name
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

//Show object example: https://api.themoviedb.org/3/tv/1668?api_key=31cc954c3de9a91aecd102e07e4d4707&append_to_response=videos,release_dates
//Show Provider Object example: https://api.themoviedb.org/3/tv/1668/watch/providers?api_key=31cc954c3de9a91aecd102e07e4d4707
//Movie object example: https://api.themoviedb.org/3/movie/18?api_key=31cc954c3de9a91aecd102e07e4d4707&append_to_response=videos,release_dates

