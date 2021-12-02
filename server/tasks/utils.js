const axios = require('axios')
const allMovies = require('./data/movie_ids_11_14_2021.json')
const allShows = require('./data/tv_series_ids_11_14_2021.json')

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
    // add continue if seeding fails
    throw (
      'TMDB Error: ' +
      e.response.data.status_code +
      ' ' +
      e.response.data.status_message
    )
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
    process.stdout.write('|')

    // check reqs
    let skip = false
    for (const k in mediaReqs)
      if (
        k !== '_separate' &&
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

    // update retval
    mediaRes.providers = await getMediaProviders(mediaId)
    media.push(propsToAdd.map((k) => mediaRes[k]))
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
      'providers',
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
      'providers',
    ]
  )
}

module.exports = {
  getMovieData,
  getShowData,
}

// // handle separate reqs
// mediaRes.providers = await getMediaProviders(mediaId)
// for (const k in mediaReqs._separate) {
//   // console.log(mediaRes.release_dates.results)
//   // break
//   const temp = mediaReqs._separate[k].func(mediaRes[k])
//   if (!mediaRes[k] || !temp) {
//     // console.log(k, mediaReqs._separate[k].amt, mediaReqs._separate[k].func(mediaRes[k]))
//     if (mediaReqs._separate[k].amt > 0) {
//       mediaReqs._separate[k].amt--
//     }
//     else {
//       i--
//       skip = true
//       break
//     }
//   } else {
//     mediaRes[k] = temp
//   }
// }
// if (skip) continue
// // break

/*
 * SAMPLE MOVIE RESPONSE
{
  adult: false,
  backdrop_path: null,
  belongs_to_collection: null,
  budget: 0,
  genres: [{ id: 18, name: 'Drama' }, { id: 9648, name: 'Mystery' }],
  homepage: '',
  id: 92683,
  imdb_id: 'tt0057046',
  original_language: 'ru',
  original_title: 'Eto Sluchilos v Militsii',
  overview: 'A story about police detectives working on reuniting children and parents who got separated by WWII. Based on Izrail Metter stories.',
  popularity: 0.6,
  poster_path: '/pe1jzUCeAuGaK9dcaQeaJeYmCDG.jpg',
  production_companies: [
    {
      id: 344,
      logo_path: '/xenuUvcunUNpbaDOYGhWZERaym7.png',
      name: 'Mosfilm',
      origin_country: 'SU'
    }
  ],
  production_countries: [{ iso_3166_1: 'SU', name: 'Soviet Union' }],
  release_date: '1963-06-06',
  revenue: 0,
  runtime: 87,
  spoken_languages: [{ english_name: 'Russian', iso_639_1: 'ru', name: 'Pусский' }],
  status: 'Released',
  tagline: '',
  title: 'It Happened at the Police Station',
  video: false,
  vote_average: 6,
  vote_count: 1,
  videos: { results: [] },
  release_dates: { results: [[Object], [Object]] }
}*/

/*
 * SAMPLE TV SHOW RESPONSE
{
 backdrop_path: '/mzgjymLy7e46Xlso9aBSd8SaezK.jpg',
 created_by: [],
 episode_run_time: [45],
 first_air_date: null,
 genres: [{ id: 18, name: 'Drama' }],
 homepage: '',
 id: 99358,
 in_production: false,
 languages: ['zh'],
 last_air_date: '2018-11-16',
 last_episode_to_air: {
   air_date: '2018-11-16',
   episode_number: 50,
   id: 2161958,
   name: '',
   overview: '',
   production_code: '',
   season_number: 2,
   still_path: '/fsQbVZ70dcQ8btkaSgeKOieNgbA.jpg',
   vote_average: 0,
   vote_count: 0
 },
 name: 'Nirvana in Fire 2: The Wind Blows in Chang Lin',
 next_episode_to_air: null,
 networks: [],
 number_of_episodes: 50,
 number_of_seasons: 1,
 origin_country: ['CN'],
 original_language: 'zh',
 original_name: '琅琊榜之风起长林',
 overview: '',
 popularity: 7.053,
 poster_path: '/k9ducodQnDzfExS0YJDLMzoOlHg.jpg',
 production_companies: [],
 production_countries: [{ iso_3166_1: 'CN', name: 'China' }],
 seasons: [
   {
     air_date: '2017-12-08',
     episode_count: 50,
     id: 143248,
     name: 'Season 2',
     overview: '',
     poster_path: '/asv4WSQh9uyHjayvVe4lToP4UWi.jpg',
     season_number: 2
   }
 ],
 spoken_languages: [{ english_name: 'Mandarin', iso_639_1: 'zh', name: '普通话' }],
 status: 'Ended',
 tagline: '',
 type: 'Scripted',
 vote_average: 8,
 vote_count: 1,
 videos: { results: [] }
}*/
