const connection = require('../config/mongoConnection')

const moviesGenreList = require('./data/movies_genre_list.json')
const showsGenreList = require('./data/tv_series_genre_list.json')

const { create: createMovie } = require('../data/movies')
const { create: createShow } = require('../data/shows')
const { getMovieData, getShowData } = require('./utils')

const NUM_MEDIA = 50

/*
 * API data requirements:
 * This is to help populate the database with more complete data (less empty fields)
 * This will only work with top-level properties of the API response
 *
 * Format:
 * {
 *  property_name: N = maximum number of empty values allowed
 * }
 *
 * Ex:
 * {
 *  poster_path: 5
 * }
 * There will be a maximum of 5 movies with no poster_path added
 * This number should be decided in regards to NUM_MEDIA
 *
 */
const movieReqs = {
  original_title: 0,
  release_date: 0,
  genres: 0,
  runtime: 0,
  poster_path: Math.floor(0.1 * NUM_MEDIA),
  overview: Math.floor(0.1 * NUM_MEDIA),
}
const showReqs = {
  first_air_date: 0,
  poster_path: 2,
  overview: 2,
  genres: 0,
}
// const showReqs = {
//   release_date: 0,
//   poster_path: 2,
//   overview: 2,
//   genres: 0,
//   poster_path: Math.floor(0.1 * NUM_MEDIA),
//   overview: Math.floor(0.1 * NUM_MEDIA),  
// }

const main = async () => {
  const db = await connection.connectToDb()
  await db.dropDatabase()

  // time seeding
  console.time('Time')

  // create movie entries
  const movieData = await getMovieData(NUM_MEDIA, movieReqs)
  debugger
  for (const data of movieData) await createMovie(...data)

  // create show entries
  const showData = await getShowData(NUM_MEDIA, showReqs)
  debugger
  for (const data of showData) await createShow(...data)

  console.log('\nDone seeding database')
  console.timeEnd('Time')
  connection.closeConnection()
}

main().catch((e) => {
  console.error(e)
  connection.closeConnection()
})

// // need to be separately handled
//   _separate: {
//     release_dates: {
//       amt: Math.floor(0.9 * NUM_MEDIA),
//       func: (val) => {
//         const temp = val.results.find((e) => e.iso_3166_1 === 'US')
//         return temp && temp.release_dates.length > 0 && temp.release_dates[0].length > 0
//           ? temp.release_dates[0].certification
//           : null
//       }
//     },
//     videos: {
//       amt: Math.floor(0.9 * NUM_MEDIA),
//       func: (val) => {
//         return val.results.find((e) => e.type === 'Trailer')
//       }
//     },
//     providers: {
//       amt: Math.floor(0.9 * NUM_MEDIA),
//       func: (val) => {
//         // console.log(val.results)
//         return val.results.US
//       }
//     },
//   }
