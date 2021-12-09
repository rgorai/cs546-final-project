import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import ShowCard from './ShowCard'
import ApiError from '../errors/ApiError'
import ShowsNavBar from '../menus/ShowsNavBar'
import ShowSortMenu from '../menus/ShowSortMenu'
import '../../styles/shows/allShowsPage.css'

const DEFAULT_SORT = 'name'
const DEFAULT_ORDER = false

// sort algorithms switch items even if they have same values
const compareNumbers = (a, b) => (a - b <= 0 ? -1 : 1)
const compareDates = (a, b) => (Date.parse(a) - Date.parse(b) <= 0 ? -1 : 1)
const compareStrings = (a, b) => (a.toLowerCase() <= b.toLowerCase() ? -1 : 1)
const showSortItems = {
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
  number_of_seasons: {
    text: 'Seasons',
    compare: compareNumbers,
  },
}

const AllShowsPage = (props) => {
  const [queryString] = useSearchParams()
  const [showList, setShowList] = useState(null)
  const [error, setError] = useState(null)

  // get shows from server and sory by querystring params
  useEffect(() => {
    document.title = 'All Shows'
    setError(null)
    const currSort = queryString.get('sort') || DEFAULT_SORT
    const currAsc = queryString.get('asc') || DEFAULT_ORDER
    if (!showSortItems[currSort])
      setError({
        status: 404,
        statusText: 'Not Found',
        data: 'invalid react querystring',
      })
    else
      axios
        .get('/api/shows')
        .then((res) => setShowList(sortShows(res.data, currSort, currAsc)))
        .catch((e) => setError(e.response))
  }, [queryString])

  useEffect(() => {
    console.log(showList)
  }, [showList])

  const sortShows = (list, sort, asc) =>
    list
      .slice()
      .sort(
        (x, y) =>
          (asc === 'true' ? 1 : -1) *
          showSortItems[sort].compare(x[sort], y[sort])
      )

  return (
    <>
      <ShowsNavBar 
      title="Shows" 
      SortMenu={
          <ShowSortMenu props={{ showSortItems, DEFAULT_SORT, DEFAULT_ORDER }} />
        }
      /> 
      {error ? (
        <ApiError error={error} />
      ) : showList ? (
        <div className="all-shows-container">
          {showList.map((show, i) => (
            <ShowCard
              key={i}
              id={show._id}
              posterPath={show.poster_path}
              name={show.name}
            />
          ))}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllShowsPage
