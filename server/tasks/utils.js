const axios = require('axios')
const allMovies = require('./movie_ids_11_14_2021.json')
const allShows = require('./tv_series_ids_11_14_2021.json')

/*
 * DOCUMENTATION: https://developers.themoviedb.org/3/getting-started/introduction
 */
const tmbdUrl = 'https://api.themoviedb.org/3/'
const tmdbApiKey = '?api_key=31cc954c3de9a91aecd102e07e4d4707'
const append = '&append_to_response=videos,release_dates'

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
 * 
*/
const movieReqs = {
  poster_path: 2,
  overview: 2,
  genres: 0
}
const showReqs = {
  // poster_path: 2,
  // overview: 2,
  // genres: 0
}

const getMediaData = async (
  numMedia,
  allMedia, 
  mediaReqs, 
  getMedia, 
  getMediaProviders,
  propsToAdd
  ) => {
  const media = []

  for (let i = 0; i < numMedia; i++) {
    const mediaId = allMedia[Math.floor(Math.random() * allMedia.length)].id
    const mediaRes = await getMedia(mediaId)
    
    // check reqs
    let skip = false
    for (const k of Object.keys(mediaReqs))
      if (!mediaRes[k] || 
          ((typeof(mediaRes[k]) === 'string' || Array.isArray(mediaRes[k]))
            && mediaRes[k].length === 0))
        if (mediaReqs[k] > 0)
          mediaReqs[k]--
        else {
          i--
          skip = true
          break
        }
    if (skip)
      continue

    // console.log(mediaRes.poster_path, mediaRes.overview ? 'overview' : '', mediaRes.genres.length === 0)

    // const mediaProviders = await getMediaProviders(mediaId)

    // add media to return
    media.push(propsToAdd.map((k) => mediaRes[k]))
    process.stdout.write('|')
  }

  return media
}

const getMovieData = async (numMedia) => {
  return await getMediaData(numMedia, allMovies, movieReqs, getMovie, getMovieProviders, [
    'original_title',
    'release_date',
    'release_dates',
    'runtime',
    'genres',
    'overview',
    'poster_path',
    'videos',
    // movieProviders.results
  ])
}

const getShowData = async (numMedia) => {
  return await getMediaData(numMedia, allShows, showReqs, getShow, getShowProviders, [
    'name',
    'first_air_date',
    'overview',
    'number_of_seasons',
    'number_of_episodes',
    'genres',
    'poster_path',
    // showProviders.results
  ])

  // return [
  //   'name',
  //   'first_air_date',
  //   'overview',
  //   'number_of_seasons',
  //   'number_of_episodes',
  //   'genres',
  //   'poster_path',
  // ]
}

module.exports = {
  getMovieData,
  getShowData,

  getMovie, 
  getMovieProviders, 
  getShow, 
  getShowProviders, 
  allMovies, 
  allShows 
}