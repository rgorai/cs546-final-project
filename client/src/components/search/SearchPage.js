import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import MovieList from '../movies/MovieList'
import ShowList from '../shows/ShowList'

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
          {/* will be mapped to search result */}
          {searchList.movieResult.length === 0 &&
          searchList.showResult.length === 0 ? (
            <div>No Result found!</div>
          ) : (
            <div>
              {searchList.movieResult.length > 0 ? (
                <MovieList
                  genre="Movie Search Result"
                  movieList={searchList.movieResult}
                />
              ) : (
                <MovieList
                  genre="No search result for movies!"
                  movieList={searchList.movieResult}
                />
              )}
              {searchList.showResult.length > 0 ? (
                <ShowList
                  genre="Show Search Result"
                  showList={searchList.showResult}
                />
              ) : (
                <ShowList
                  genre="No search result for shows!"
                  showList={searchList.showResult}
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
