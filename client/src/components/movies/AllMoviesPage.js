import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import MovieCard from './MovieCard'
import ApiError from '../errors/ApiError'
import MoviesNavBar from '../menus/MoviesNavBar'
import SortMenu from '../menus/SortMenu'
import '../../styles/movies/allMoviesPage.css'

const DEFAULT_SORT = 'name'
const DEFAULT_ORDER = 'false'

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
  // const [movies, setMovies] = useState(null)
  const movies = useRef([])
  const [movieList, setMovieList] = useState([])
  const [error, setError] = useState(null)
  const [queryString] = useSearchParams()
  const sortMethod = useRef(queryString.get('sort'))
  const orderMethod = useRef(queryString.get('asc'))

  // // set default querystring
  // useEffect(() => {
  //   if (!queryString.get('sort')) sortMethod.current = DEFAULT_SORT
  //   if (!queryString.get('ascending')) orderMethod.current = DEFAULT_ORDER
  //   setQueryString({
  //     sort: sortMethod.current,
  //     asc:orderMethod.current,
  //   })
  //   console.log('in here')
  // }, [queryString, setQueryString])

  // get movies from server
  useEffect(() => {
    const sort = queryString.get('sort')
    const asc = queryString.get('asc')

    console.log('all_movies', sort, asc)

    if (sort && asc)
      if (!movieSortItems[sort] || !(asc === 'true' || asc === 'false'))
        setError({
          status: 404,
          statusText: 'Not Found',
          data: 'invalid react querystring',
        })
      else
        axios
          .get('/api/movies')
          .then((res) => {
            // movies.current = res.data
            setMovieList(sortMovies(res.data, sort, asc))
          })
          .catch((e) => setError(e.response))
  }, [queryString])

  // useEffect(() => {
  //   console.log('movies updates', movies.current)
  //   setMovieList(movies.current)
  // }, [movies.current])

  useEffect(() => {
    console.log('movielistval', movieList)
  }, [movieList])

  // get params from queryString and sort movies accordingly
  // useEffect(() => {
  //   // console.log('query updated')
  //   sortMethod.current = queryString.get('sort')
  //   orderMethod.current = queryString.get('asc')
  //   console.log('all_movies', sortMethod.current, orderMethod.current)

  //   if (!queryString.get('sort')) sortMethod.current = DEFAULT_SORT
  //   if (!queryString.get('asc')) orderMethod.current = DEFAULT_ORDER

  //   if (!movieSortItems[sortMethod.current] || !(orderMethod.current === 'true' || orderMethod.current === 'false'))
  //     setError({
  //       status: 404,
  //       statusText: 'Not Found',
  //       data: 'invalid react querystring',
  //     })
  //   else if (movies) setMovies(sortMovies(movies))
  // }, [queryString, movies, setMovies])

  // sort movies by query string
  const sortMovies = (list, sort, asc) => {
    // console.log(sortMethod.current, orderMethod.current)
    return list
      .slice()
      .sort(
        (x, y) =>
          (asc === 'true' ? 1 : -1) *
          movieSortItems[sort].compare(x[sort], y[sort])
      )
  }

  // construct movie list ui
  const getList = () => {
    if (movies.length === 0) return <div>Theres nothing here</div>

    return movies.current
      .slice()
      .sort(
        (x, y) =>
          (orderMethod.current === 'true' ? 1 : -1) *
          movieSortItems[sortMethod.current].compare(
            x[sortMethod.current],
            y[sortMethod.current]
          )
      )
      .map((movie, i) => (
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
      <MoviesNavBar
        title="Movies"
        SortMenu={<SortMenu movieSortItems={movieSortItems} />}
      />
      {error ? (
        <ApiError error={error} />
      ) : movieList.length > 0 ? (
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
