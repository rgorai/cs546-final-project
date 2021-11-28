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
      .get('/shows')
      .then((res) => setShowList(res.data))
      // should ui if fetch fails
      .catch((e) => setError(e.response))
  }, [])
   
  return (
    <>
      {/* will be mapped to list of shows grouped by genre */}
      {error ? (
        <ApiError status={error.status} statusMessage={error.statusText} />
      ) : showList ? (
        <div className="shows-page-container">
            <ShowList showList={showList.slice(0, 12)}/>
            <ShowList showList={showList.slice(12, 25)}/>
            <ShowList showList={showList.slice(25, 37)}/>
            <ShowList showList={showList.slice(37)}/>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}


export default AllShowsPage