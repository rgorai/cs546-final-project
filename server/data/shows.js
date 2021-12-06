const mongoCollections = require('../config/mongoCollections')
const showCollection = mongoCollections.shows
const { ObjectId } = require('mongodb')
const showsGenreList = require('../tasks/data/tv_series_genre_list.json')

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
  id,
  name,
  releaseDate,
  description,
  number_of_seasons,
  number_of_episodes,
  genres,
  posterPath,
  video,
  providers
) => {
  // error check
  if (!id) throw 'Show should have an id'
  if (!name) throw 'Show should have a name'
  if (!number_of_seasons) throw 'Show should have number of seasons'
  if (!number_of_episodes) throw 'Show should have number of episodes'
  if (!genres) throw 'Show should have genres'

  // parse data
  name = name.trim()
  releaseDate = releaseDate.trim()
  number_of_seasons = parseInt(number_of_seasons)
  number_of_episodes = parseInt(number_of_episodes)
  video = video.results.find((e) => e.type === 'Trailer')

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
    tmdbId: id,
    name: name,
    releaseDate: releaseDate,
    description: description,
    number_of_seasons: number_of_seasons,
    number_of_episodes: number_of_episodes,
    genres: genres,
    posterPath: posterPath,
    video: video,
    providers: providers,
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
const getAllByGenre = async (x) => {
  // error check
  if (typeof x !== 'undefined') throw 'Error: no parameters should be given.'

  // start with map of genre id to genre name
  const showsByGenre = {
    data: {},
    _names: showsGenreList.reduce(
      (prev, curr) => ({
        ...prev,
        [curr.id]: curr.name,
      }),
      {}
    ),
  }

  // assign shows to each genre they have
  const shows = await getAll()
  for (const show of shows)
    for (const genre of show.genres)
      if (showsByGenre.data[genre.id]) showsByGenre.data[genre.id].push(show)
      else showsByGenre.data[genre.id] = [show]

  return showsByGenre
}

const getAllByProvider = async (x) => {
  // error check
  if (typeof x !== 'undefined') throw 'Error: no parameters should be given.'

  // assign shows to each provider they have
  const showsByProvider = {
    data: {},
    _names: {},
  }
  const shows = await getAll()
  for (const show of shows)
    if (show.providers)
      for (const p of show.providers)
        if (showsByProvider.data[p.provider_id])
          showsByProvider.data[p.provider_id].push(show)
        else {
          showsByProvider.data[p.provider_id] = [show]
          showsByProvider._names[p.provider_id] = p.provider_name
        }

  return showsByProvider
}

//func to get tv shows of a particular genre
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

//func to get tv show of a specific name
const getByName = async (str) => {
  if (!str) throw 'Must provide a name'

  try {
    checkIsString(str)
  } catch (e) {
    throw e
  }

  const shows = await showCollection()
  return await shows.find({ name: { $eq: str } }).toArray()
}

const getByTrending = async () => {
  let shows = await getAll()
  shows = shows.sort((a, b) => 
    b.overallRating - a.overallRating
  ).slice(0, 5)
  
  return shows
}

module.exports = {
  create,
  get,
  getAll,
  getAllByGenre,
  getAllByProvider,
  getByGenre,
  getByName,
  getByTrending
}

//Show object example: https://api.themoviedb.org/3/tv/1668?api_key=31cc954c3de9a91aecd102e07e4d4707&append_to_response=videos,release_dates
//Show Provider Object example: https://api.themoviedb.org/3/tv/1668/watch/providers?api_key=31cc954c3de9a91aecd102e07e4d4707
//Movie object example: https://api.themoviedb.org/3/movie/18?api_key=31cc954c3de9a91aecd102e07e4d4707&append_to_response=videos,release_dates
