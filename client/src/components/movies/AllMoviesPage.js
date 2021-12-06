import { useEffect, useState, useRef } from 'react'
import { useSearchParams, Navigate } from 'react-router-dom'
import axios from 'axios'

import MovieCard from './MovieCard'
import ApiError from '../errors/ApiError'
import MoviesNavBar from '../menus/MoviesNavBar'
import SortMenu from '../menus/SortMenu'
import '../../styles/movies/allMoviesPage.css'

const DEFAULT_SORT = 'name'
const DEFAULT_ORDER = false
const DEFAULT_QUERY = `/movies/all?sort=${DEFAULT_SORT}&asc=${DEFAULT_ORDER}`

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

const AllMoviesPage = (props) => {
  const [queryString] = useSearchParams()
  const [movieList, setMovieList] = useState(null)
  const [error, setError] = useState(null)

  // get movies from server and sory by querystring params
  useEffect(() => {
    document.title = 'All Movies'
    setError(null)
    const sort = queryString.get('sort')
    const asc = queryString.get('asc')
    if (sort && asc)
      if (!movieSortItems[sort])
        setError({
          status: 404,
          statusText: 'Not Found',
          data: 'invalid react querystring',
        })
      else
        axios
          .get('/api/movies')
          .then((res) => {
            setMovieList(sortMovies(res.data, sort, asc))
          })
          .catch((e) => setError(e.response))
  }, [queryString])

  const sortMovies = (list, sort, asc) =>
    list
      .slice()
      .sort(
        (x, y) =>
          (asc === 'true' ? 1 : -1) *
          movieSortItems[sort].compare(x[sort], y[sort])
      )

  return (
    <>
      <MoviesNavBar
        title="Movies"
        SortMenu={
          <SortMenu props={{ movieSortItems, DEFAULT_SORT, DEFAULT_ORDER }} />
        }
      />
      {error ? (
        <ApiError error={error} />
      ) : movieList ? (
        <div className="all-movies-container">
          {movieList.map((movie, i) => (
            <MovieCard
              key={i}
              id={movie._id}
              posterPath={movie.poster_path}
              name={movie.name}
            />
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllMoviesPage
