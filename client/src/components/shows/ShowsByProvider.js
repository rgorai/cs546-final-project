import { useEffect, useState } from 'react'
import axios from 'axios'

import ShowList from './ShowList'
import ApiError from '../errors/ApiError'
import ShowsNavBar from '../menus/ShowsNavBar'
import '../../styles/shows/showsByProvider.css'

const ShowsByProvider = (props) => {
  const [showsByProvider, setShowsByProvider] = useState(null)
  const [error, setError] = useState(null)

  // get shows from server
  useEffect(() => {
    axios
      .get('/api/shows/byprovider')
      .then((res) => setShowsByProvider(res.data))
      .catch((e) => setError(e.response))
  }, [])

  // construct show list ui
  const getList = () => {
    if (showsByProvider.length === 0) return <div>Theres nothing here</div>
    const { data, _names } = showsByProvider
    return Object.keys(data)
      .filter((k) => data[k].length > 0)
      .sort((k1, k2) => data[k2].length - data[k1].length)
      .map((k, i) => <ShowList key={i} name={_names[k]} showList={data[k]} />)
  }

  return (
    <>
      <ShowsNavBar />
      {error ? (
        <ApiError error={error} />
      ) : showsByProvider ? (
        <div className="shows-bygenre-container">{getList()}</div>
      ) : (
        <div>Loading</div>
      )}
    </>
  )
}

export default ShowsByProvider
