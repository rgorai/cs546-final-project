import { useSearchParams, useNavigate, Navigate } from 'react-router-dom'
import AllMoviesPage from '../movies/AllMoviesPage'

import { createBrowserHistory } from 'history'
import { useEffect } from 'react'

const DEFAULT_SORT = 'name'
const DEFAULT_ORDER = false
const DEFAULT_QUERY = `/movies/all?sort=${DEFAULT_SORT}&asc=${DEFAULT_ORDER}`

const ValidateMoviesQuery = (props) => {
  const [queryString] = useSearchParams()

  const history = createBrowserHistory()
  const navigate = useNavigate()

  console.log('validating')

  useEffect(() => {
    if (!queryString.get('sort') || !queryString.get('asc'))
      // history.replace(DEFAULT_QUERY)
      navigate(DEFAULT_QUERY)
  }, [queryString, navigate])

  return <AllMoviesPage />
  // return !queryString.get('sort') || !queryString.get('asc')
  //   ? <Navigate to={DEFAULT_QUERY} />
  //   : <AllMoviesPage />
}

export { ValidateMoviesQuery }
