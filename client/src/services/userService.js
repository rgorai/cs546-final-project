import axios from 'axios'
import authHeader from './authHeader'

const getUserProfile = () => {
  return axios.get('/api/user/profile', { headers: authHeader() })
}

const updateUserProfile = (userData) => {
  return axios.post('/api/user/profile', userData, { headers: authHeader() })
}

const postReview = (reviewData) => {
  return axios.post('/api/reviews', reviewData, { headers: authHeader() })
}

// add protect items link adding to watchlist, adding review, etc.

export { getUserProfile, updateUserProfile, postReview }
