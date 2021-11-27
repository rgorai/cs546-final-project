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
  } catch (e) {
    throw 'TMDB ' + String(e)
  }
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
      if (
        k !== 'providers' &&
        (!mediaRes[k] ||
          ((typeof mediaRes[k] === 'string' || Array.isArray(mediaRes[k])) &&
            mediaRes[k].length === 0))
      )
        if (mediaReqs[k] > 0) mediaReqs[k]--
        else {
          i--
          skip = true
          break
        }
    if (skip) continue

    const mediaProviders = await getMediaProviders(mediaId)
    if (!mediaProviders.results.US)
      if (mediaReqs.providers > 0) mediaReqs.providers--
      else {
        i--
        continue
      }

    // add media to return
    media.push(propsToAdd.map((k) => mediaRes[k]))
    media[media.length - 1].push(mediaProviders.results.US)

    process.stdout.write('|')
  }

  return media
}

const getMovieData = async (numMedia, mediaReqs) => {
  return await getMediaData(
    numMedia,
    allMovies,
    mediaReqs,
    getMovie,
    getMovieProviders,
    [
      'original_title',
      'release_date',
      'release_dates',
      'runtime',
      'genres',
      'overview',
      'poster_path',
      'videos',
    ]
  )
}

const getShowData = async (numMedia, mediaReqs) => {
  return await getMediaData(
    numMedia,
    allShows,
    mediaReqs,
    getShow,
    getShowProviders,
    [
      'name',
      'first_air_date',
      'overview',
      'number_of_seasons',
      'number_of_episodes',
      'genres',
      'poster_path',
    ]
  )
}

module.exports = {
  getMovieData,
  getShowData,
}
