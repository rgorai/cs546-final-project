import { useEffect, useState } from 'react'
import axios from 'axios'

import MediaList from '../movies/MediaList'
import ApiError from '../errors/ApiError'
import ShowsNavBar from '../menus/ShowsNavBar'
import '../../styles/shows/showsByGenre.css'

const AllShowsPage = (props) => {
  const [showsByGenre, setShowsByGenre] = useState(null)
  const [error, setError] = useState(null)

  // get shows from server
  useEffect(() => {
    document.title = 'Show Genres'
    axios
      .get('/api/shows/bygenre')
      .then((res) => setShowsByGenre(res.data))
      .catch((e) => setError(e.response))
  }, [])

  // construct show list ui
  const getList = () => {
    if (showsByGenre.length === 0) return <div>Theres nothing here</div>
    const { data, _names } = showsByGenre
    return Object.keys(data)
      .filter((k) => data[k].length > 0)
      .sort((k1, k2) => data[k2].length - data[k1].length)
      .map((k, i) => (
        <MediaList key={i} title={_names[k]} mediaList={data[k]} />
      ))
  }

  return (
    <>
      <ShowsNavBar title="Shows" />
      {error ? (
        <ApiError error={error} />
      ) : showsByGenre ? (
        <div className="shows-bygenre-container">{getList()}</div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  )
}

export default AllShowsPage
