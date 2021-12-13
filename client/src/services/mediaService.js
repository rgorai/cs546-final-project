import axios from 'axios'
import authHeader from './authHeader'

const postMediaRequest = async (
  name,
  releaseDate,
  mpa_rating,
  description,
  genres,
  providers
) => {
  let request = {
    name: name,
    releaseDate: releaseDate,
    mpa_rating: mpa_rating,
    description: description,
    genres: genres,
    providers: providers,
  }

  let headers = authHeader()

  return await axios.post('/api/movies', request, { headers })
}

export { postMediaRequest }
