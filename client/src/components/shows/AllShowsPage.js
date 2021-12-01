import { useEffect, useState } from 'react'
import axios from 'axios'

import ShowList from './ShowList'
import ApiError from '../errors/ApiError'
import '../../styles/shows/allShowsPage.css'

const AllShowsPage = (props) => {
  const [showList, setShowList] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('/shows/bygenre')
      .then((res) => setShowList(res.data))
      .catch((e) => setError(e.response))
  }, [])

  const getGenreList = (showsByGenre) => {
    if (showsByGenre.length === 0) return <div>Theres nothing here</div>

    const { data, _names } = showsByGenre
    return Object.keys(data)
      .sort((x, y) => data[y].length - data[x].length)
      .map((k, i) => (
        <ShowList key={i} genreName={_names[k]} showList={data[k]} />
      ))
  }

  return (
    <>
      {/* will be mapped to list of shows grouped by genre */}
      {error ? (
        <ApiError error={error} />
      ) : showsByGenre ? (
        <div className="shows-page-container">
          {getGenreList(moviesByGenre)}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllShowsPage
