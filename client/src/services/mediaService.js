import axios from 'axios'
import authHeader from './authHeader'

const create = async (
  name,
  releaseDate,
  mpa_rating,
  description,
  runtime,
  genres,
  providers
) => {
  let request = {
    name: name,
    releaseDate: releaseDate,
    mpa_rating: mpa_rating,
    description: description,
    runtime: runtime,
    genres: genres,
    providers: providers,
  }

  let headers = authHeader()
  let data = null

  try {
    data = await axios.post('/api/movies', request, { headers })
  } catch (e) {
    throw e
  }
}

export { create }
