import { getCurrUser } from './authService.js'
const authHeader = () => {
  const user = getCurrUser()
  if (user && user.access_token) return { access_token: user.access_token }
  return {}
}
export default authHeader
