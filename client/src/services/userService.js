import axios from 'axios'
import authHeader from './authHeader'

const getUserContent = () => {
  return axios.get('/user/profile', { headers: authHeader() })
}

// add protect items link adding to watchlist, adding review, etc.

export { getUserContent }
