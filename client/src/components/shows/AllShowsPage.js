import { useEffect, useState } from 'react'
import axios from 'axios'

import ShowList from './ShowList'
import '../../styles/shows/allShowsPage.css'

const AllShowsPage = (props) => {
  const [showList, setShowList] = useState([])

  useEffect(() => {
    axios.get('/shows')
      .then((res) => setShowList(res.data))
      // should ui if fetch fails
      .catch((e) => console.log('show fetch error: ', e))
  }, [])
    
  return (
    <div className="shows-page-container">
      {/* will be mapped to list of shows grouped by genre */}
      {showList.length === 0
        ? <div>Loading</div>
        : <div>
            <ShowList showList={showList.slice(0, 7)}/>
            <ShowList showList={showList.slice(7, 14)}/>
            <ShowList showList={showList.slice(14)}/>
          </div>
      }
    </div>
  )
}

export default AllShowsPage