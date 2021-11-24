import axios from 'axios'
import authHeader from './authHeader'

const getUserContent = () => {
  return axios.get('/users', { headers: authHeader() })
}

export { getUserContent }