const connection = require('../config/mongoConnection')

const { create: createMovie } = require('../data/movies')
const { create: createShow } = require('../data/shows')
const { create: createUser } = require('../data/users')
const { createReview } = require('../data/reviews')
const { addToWatchlist } = require('../data/users')
const { getMovieData, getShowData } = require('./utils')
const userList = require('./data/users.json')
const reviewList = require('./data/reviews.json')

const NUM_MEDIA = 100
const NUM_MEDIA_TO_REVIEW = 20
const NUM_REVIEWS = 10

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
 *  title: 0,
 *  poster_path: 5
 * }
 * - Title is required
 * - There will be a maximum of 5 movies with no poster_path added
 *
 * N should be decided in regards to NUM_MEDIA
 *
 */
const movieReqs = {
  title: 0,
  release_date: 0,
  genres: 0,
  runtime: 0,
  poster_path: Math.floor(0.1 * NUM_MEDIA),
  overview: Math.floor(0.1 * NUM_MEDIA),
}
const showReqs = {
  first_air_date: 0,
  name: 0,
  number_of_seasons: 0,
  number_of_episodes: 0,
  genres: 0,
  poster_path: Math.floor(0.1 * NUM_MEDIA),
  overview: Math.floor(0.1 * NUM_MEDIA),
}

const main = async () => {
  const db = await connection.connectToDb()
  await db.dropDatabase()
  let userInfo = []
  let movieInfo = []
  let showInfo = []

  // time seeding
  console.time('Time')

  // create user entries
  for (let user of userList) {
    let id = await createUser(
      user.firstName,
      user.lastName,
      user.email,
      user.username,
      user.password
    )
    let myObj = {}
    myObj['id'] = id
    myObj['username'] = user.username
    userInfo.push(myObj)
  }

  // create movie entries
  const movieData = await getMovieData(NUM_MEDIA, movieReqs)
  for (const data of movieData) {
    let movie = await createMovie(...data)
    movieInfo.push(movie)
  }

  // create show entries
  const showData = await getShowData(NUM_MEDIA, showReqs)
  for (const data of showData) {
    let show = await createShow(...data)
    showInfo.push(show)
  }

  // create watchlist for each user
  for (let user of userInfo) {
    let movie = movieInfo[Math.floor(Math.random() * movieInfo.length)]
    let show = showInfo[Math.floor(Math.random() * showInfo.length)]

    await addToWatchlist(user.id, movie._id)
    await addToWatchlist(user.id, show._id)
  }

  // insert reviews
  for (let i = 0; i < NUM_MEDIA_TO_REVIEW; i++) {
    let movie = movieInfo[Math.floor(Math.random() * movieInfo.length)]
    let show = showInfo[Math.floor(Math.random() * showInfo.length)]

    for (let j = 0; j < NUM_REVIEWS; j++) {
      let user = userInfo[Math.floor(Math.random() * userInfo.length)]
      let review = reviewList[Math.floor(Math.random() * reviewList.length)]

      await createReview(
        user.id,
        user.username,
        movie._id,
        movie.name,
        review.review,
        review.rating
      )
      await createReview(
        user.id,
        user.username,
        show._id,
        show.name,
        review.review,
        review.rating
      )
    }
  }

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
