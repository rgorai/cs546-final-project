const connection = require('../config/mongoConnection')
const axios = require('axios')
const allMovies = require('./movie_ids_11_14_2021.json')
const allShows = require('./tv_series_ids_11_14_2021.json')

const { create: createMovie } = require('../data/movies')

/*
 * DOCUMENTATION: https://developers.themoviedb.org/3/getting-started/introduction
 */
const tmbdUrl = 'https://api.themoviedb.org/3/'
const tmdbApiKey = '?api_key=31cc954c3de9a91aecd102e07e4d4707'
const append = '&append_to_response=images,videos'

const getMovie = async (movieId) => {
  const url = tmbdUrl + 'movie/' + movieId + tmdbApiKey + append
  return await tmdbRequest(url)
}
const getMovieProviders = async (movieId) => {
  const url = tmbdUrl + 'movie/' + movieId + '/watch/providers' + tmdbApiKey
  return await tmdbRequest(url)
}
const getShow = async (showId) => {
  const url = tmbdUrl + 'tv/' + showId + tmdbApiKey + append
  return await tmdbRequest(url)
}
const getShowProviders = async (showId) => {
  const url = tmbdUrl + 'tv/' + showId + '/watch/providers' + tmdbApiKey
  return await tmdbRequest(url)
}
const tmdbRequest = async (url) => {
  try {
    const { data } = await axios.get(url)
    return data
  } catch(e) {
    throw 'TMDB '+ String(e)
  }
}

const main = async () => {
  const db = await connection.connectToDb()
  await db.dropDatabase()

  // get random media using local json files
  const movieId = allMovies[Math.floor(Math.random() * allMovies.length)].id
  // const showId = allShows[Math.floor(Math.random() * allShows.length)].id

  // get media info with tmdb api
  const movieRes = await getMovie(movieId)
  const showRes = await getShow(showId)
  // console.log(movieRes)
  // console.log(showRes)

  // get streaming providers
  const movieProviders = await getMovieProviders(movieId)
  const showProviders = await getShowProviders(showId)
  // console.log(movieProviders)
  // console.log(showProviders)


  console.log('Done seeding database');
  connection.closeConnection()
}

main().catch((e) => {
  console.error(e)
  connection.closeConnection()
})
