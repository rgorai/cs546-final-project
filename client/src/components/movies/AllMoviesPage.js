import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import MovieCard from './MovieCard'
import ApiError from '../errors/ApiError'
import MoviesNavBar from '../menus/MoviesNavBar'
import '../../styles/movies/allMoviesPage.css'

const DEFAULT_SORT = 'name'
const DEFAULT_ORDER = 'false'

const AllMoviesPage = (props) => {
  const [movies, setMovies] = useState(null)
  const [error, setError] = useState(null)
  const [queryString, setQueryString] = useSearchParams()
  let sortMethod = useRef(queryString.get('sort'))
  let orderMethod = useRef(queryString.get('ascending'))

  // set default querystring
  useEffect(() => {
    if (!queryString.get('sort')) sortMethod.current = DEFAULT_SORT
    if (!queryString.get('ascending')) orderMethod.current = DEFAULT_ORDER
    setQueryString({
      sort: sortMethod.current,
      ascending: orderMethod.current,
    })
    console.log('in here')
  }, [queryString, setQueryString])

  // get params from queryString and sort movies accordingly
  const compareNumbers = (a, b) => a - b
  const compareDates = (a, b) => Date.parse(a) - Date.parse(b)
  const compareStrings = (a, b) => (a.toLowerCase() < b.toLowerCase() ? -1 : 1)
  const movieSortItems = {
    name: {
      text: 'Title',
      compare: compareStrings,
    },
    overall_rating: {
      text: 'Popularity',
      compare: compareNumbers,
    },
    release_date: {
      text: 'Release Date',
      compare: compareDates,
    },
    runtime: {
      text: 'Runtime',
      compare: compareNumbers,
    },
    revenue: {
      text: 'Revenue',
      compare: compareNumbers,
    },
  }

  // get movies from server
  useEffect(() => {
    axios
      .get('/api/movies')
      .then((res) => setMovies(res.data))
      .catch((e) => setError(e.response))
  }, [])

  // sort movies by query string
  const sortMovies = (list) => {
    // console.log('MUST BE HERE', movieSortItems[sortMethod.current])
    console.log(true, 'true', Boolean('false'))
    if (!movieSortItems[sortMethod.current] || !Boolean(orderMethod.current)) {
      setError({
        status: 404,
        statusText: 'Not Found',
        data: 'invalid react querystring',
      })
      return []
    }
    console.log(list)
    return list.sort(
      (x, y) =>
        (orderMethod.current === 'true' ? 1 : -1) *
        movieSortItems[sortMethod.current].compare(
          x[sortMethod.current],
          y[sortMethod.current]
        )
    )
  }

  // construct movie list ui
  const getList = () => {
    if (movies.length === 0) return <div>Theres nothing here</div>
    return sortMovies(movies).map((movie, i) => (
      <MovieCard
        key={i}
        id={movie._id}
        posterPath={movie.poster_path}
        name={movie.name}
      />
    ))
  }

  return (
    <>
      <MoviesNavBar title="Movies" movieSortItems={movieSortItems} />
      {error ? (
        <ApiError error={error} />
      ) : movies ? (
        <div className="all-movies-container">{getList()}</div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllMoviesPage
