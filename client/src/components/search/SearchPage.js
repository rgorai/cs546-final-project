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
        <div className="search-page-container">
          <h2>Search Results:</h2>
          {searchList.movieResult.length === 0 &&
          searchList.showResult.length === 0 ? (
            <div>No Result found!</div>
          ) : (
            <div>
              {searchList.movieResult.length > 0 ? (
                <MediaList
                  genre="Movie Search Result"
                  mediaList={searchList.movieResult}
                />
              ) : (
                <MediaList
                  genre="No search result for movies!"
                  mediaList={searchList.movieResult}
                />
              )}
              {searchList.showResult.length > 0 ? (
                <MediaList
                  genre="Show Search Result"
                  mediaList={searchList.showResult}
                />
              ) : (
                <MediaList
                  genre="No search result for shows!"
                  mediaList={searchList.showResult}
                />
              )}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default SearchPage
