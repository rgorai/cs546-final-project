import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import MovieCard from './MovieCard'
import ApiError from '../errors/ApiError'
import MoviesNavBar from '../menus/MoviesNavBar'
import SortMenu from '../menus/SortMenu'
import '../../styles/movies/allMoviesPage.css'

const DEFAULT_SORT = 'name'
const DEFAULT_ORDER = false

// sort algorithms switch items even if they have same values
const compareNumbers = (a, b) => (a - b <= 0 ? -1 : 1)
const compareDates = (a, b) => (Date.parse(a) - Date.parse(b) <= 0 ? -1 : 1)
const compareStrings = (a, b) => (a.toLowerCase() <= b.toLowerCase() ? -1 : 1)
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
    const currSort = queryString.get('sort') || DEFAULT_SORT
    const currAsc = queryString.get('asc') || DEFAULT_ORDER
    if (!movieSortItems[currSort])
      setError({
        status: 404,
        statusText: 'Not Found',
        data: 'invalid react querystring',
      })
    else
      axios
        .get('/api/movies')
        .then((res) => setMovieList(sortMovies(res.data, currSort, currAsc)))
        .catch((e) => setError(e.response))
  }, [queryString])

  useEffect(() => {
    console.log(movieList)
  }, [movieList])

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
