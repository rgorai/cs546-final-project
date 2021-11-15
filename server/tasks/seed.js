const connection = require('../config/mongoConnection')
const axios = require('axios')
const allMovies = require('./movie_ids_11_14_2021.json')

const { create: createMovie } = require('../data/movies')

const tmdbApiKey = '?api_key=31cc954c3de9a91aecd102e07e4d4707'
const tmbdUrl = 'https://api.themoviedb.org/3/movie/'

const NUM_GENRES = 10   // number of genres to gather
const NUM_MOVIES = 20   // number of movies per genre

const getMovie = async (movieId) => {
  try {
    const { data } = await axios.get(
      tmbdUrl + movieId + tmdbApiKey
    )
    return data
  } catch(e) {
    console.error(e)
  }
}

const getMovieProviders = async (movieId) => {
  try {
    const { data } = await axios.get(
      tmbdUrl + movieId + '/watch/providers' + tmdbApiKey
    )
    return data
  } catch(e) {
    console.error(e)
  }
}

const main = async () => {
  const db = await connection.connectToDb()
  await db.dropDatabase()

  // gather movie data
  const moviesToSeed = []
  let foundGenres = []
  while (foundGenres.length < NUM_GENRES) {
    // get random movie id
    const randomMovieId = allMovies[Math.floor(Math.random() * allMovies.length)].id

    // check genre
    const randomMovie = await getMovie('1726')
    console.log(randomMovie)
    const { results } = await getMovieProviders('1726')
    console.log(results.US.rent)
    break
  }

  console.log('Done seeding database');
  connection.closeConnection()
}

main()
