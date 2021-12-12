import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios'

import ShowList from './ShowList'
import ApiError from '../errors/ApiError'
import ShowsNavBar from '../menus/ShowsNavBar'
import SortMenu from '../menus/SortMenu'
import '../../styles/shows/allShowsPage.css'

const DEFAULT_SORT = 'overall_rating'
const DEFAULT_ORDER = false

// sort algorithms switch items even if they have same values
const compareNumbers = (a, b) => (a - b <= 0 ? -1 : 1)
const compareDates = (a, b) => (Date.parse(a) - Date.parse(b) <= 0 ? -1 : 1)
const compareStrings = (a, b) => (a.toLowerCase() <= b.toLowerCase() ? -1 : 1)
const showSortItems = {
  overall_rating: {
    text: 'Popularity',
    compare: compareNumbers,
  },
  name: {
    text: 'Title',
    compare: compareStrings,
  },
  release_date: {
    text: 'Release Date',
    compare: compareDates,
  },
  number_of_seasons: {
    text: 'No. Seasons',
    compare: compareNumbers,
  },
  number_of_episodes: {
    text: 'No. Episodes',
    compare: compareNumbers,
  }
}

const AllShowsPage = (props) => {
  const [queryString] = useSearchParams()
  const [showList, setShowList] = useState(null)
  const [error, setError] = useState(null)

  // get shows from server and sory by querystring params
  useEffect(() => {
    console.log('here')
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
        SortMenu={
          <SortMenu
            props={{ sortItems: showSortItems, DEFAULT_SORT, DEFAULT_ORDER }}
          />
        }
      />
      {error ? (
        <ApiError error={error} />
      ) : showList ? (
        <div className="all-shows-container">
          <ShowList showList={showList} />
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  )
}

export default AllShowsPage
