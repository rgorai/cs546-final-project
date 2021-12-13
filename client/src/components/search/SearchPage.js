import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import '../../styles/home/searchPage.css'
import MediaList from '../movies/MediaList'

const SearchPage = (props) => {
  const { query: searchName } = useParams()
  const [searchList, setSearchList] = useState(null)

  useEffect(() => {
    document.title = 'Search Results'
    axios
      .get(`/api/search/${searchName}`)
      .then((res) => {
        console.log(res.data)
        setSearchList(res.data)
      })
      // should ui if fetch fails
      .catch((e) => console.log('search fetch error: ', e))
  }, [searchName])

  return (
    <>
      {searchList && (
        <div className="card-background search-page-container">
          <h1>Search Results</h1>
          {searchList.movieResult.length === 0 &&
          searchList.showResult.length === 0 ? (
            <div className="none-message">Nothing found</div>
          ) : (
            <div>
              <MediaList title="Movies" mediaList={searchList.movieResult} />
              <MediaList title="Shows" mediaList={searchList.showResult} />
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SearchPage
