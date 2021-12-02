import { useEffect, useState } from 'react'
import axios from 'axios'

import ShowList from './ShowList'
import ApiError from '../errors/ApiError'
import '../../styles/shows/allShowsPage.css'

const AllShowsPage = (props) => {
  const [showsByGenre, setShowList] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    axios
      .get('/api/shows')
      .then((res) => setShowList(res.data))
      .catch((e) => setError(e.response))
  }, [])

  const getGenreList = (showsByGenre) => {
    if (showsByGenre.length === 0) return <div>Theres nothing here</div>

    const { data, _names } = showsByGenre
    return Object.keys(data)
      .filter((k) => data[k].length > 0)
      .sort((k1, k2) => data[k2].length - data[k1].length)
      .map((k, i) => (
        <ShowList key={i} genreName={_names[k]} showList={data[k]} />
      ))
  }

  return (
    <>
      {error ? (
        <ApiError error={error} />
      ) : showsByGenre ? (
        <div className="shows-page-container">
          {getGenreList(showsByGenre)}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default AllShowsPage
