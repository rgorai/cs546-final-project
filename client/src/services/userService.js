import axios from 'axios'
import authHeader from './authHeader'

const getUserProfile = () => {
  return axios.get('/api/user/profile', { headers: authHeader() })
}

const updateUserProfile = (firstName, lastName, email, username, password) => {
  return axios.put(
    '/api/user/profile',
    {
      firstName,
      lastName,
      email,
      username,
      password,
    },
    { headers: authHeader() }
  )
}

const postReview = (reviewData) => {
  return axios.post('/api/reviews', reviewData, { headers: authHeader() })
}

const postItem = (id) => {
  let addItem = {
    itemId: id,
  }
  return axios.put('/api/user/watchlist', addItem, { headers: authHeader() })
}

const deleteItem = (itemId) => {
  return axios.delete('/api/user/watchlist', {
    data: { itemId },
    headers: authHeader(),
  })
}

export { getUserProfile, updateUserProfile, postReview, postItem, deleteItem }
