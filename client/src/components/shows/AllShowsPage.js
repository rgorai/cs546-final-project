import { useEffect, useState } from 'react'
import axios from 'axios'

import ShowCard from './ShowCard'
import ApiError from '../errors/ApiError'
import ShowsNavBar from '../menus/ShowsNavBar'
import '../../styles/shows/allShowsPage.css'

const AllShowsPage = (props) => {
  const [shows, setShows] = useState(null)
  const [error, setError] = useState(null)

  // get shows from server
  useEffect(() => {
    document.title = 'All Shows'
    axios
      .get('/api/shows')
      .then((res) => setShows(res.data))
      .catch((e) => setError(e.response))
  }, [])

  // construct show list ui
  const getList = () => {
    if (shows.length === 0) return <div>Theres nothing here</div>
    return shows
      .sort((_, m) => (m.poster_path ? 1 : -1))
      .map((show, i) => (
        <ShowCard
          key={i}
          id={show._id}
          posterPath={show.poster_path}
          name={show.name}
        />
      ))
  }

  return (
    <>
      <ShowsNavBar title="Shows" shows={shows} setShows={setShows} />
      {error ? (
        <ApiError error={error} />
      ) : shows ? (
        <div className="all-shows-container">{getList()}</div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllShowsPage
