import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import MovieList from '../movies/MovieList'
import ShowList from '../shows/ShowList'

const SearchPage = (props) => {
    const { query: searchName } = useParams()
    const [searchList, setSearchList] = useState(null)
  
    useEffect(() => {
      axios.get(`http://localhost:5001/search/${searchName}`)
        .then((res) =>{
            console.log(res.data)
            setSearchList(res.data)})
        // should ui if fetch fails
        .catch((e) => console.log('search fetch error: ', e))
    }, [])
      
    return (
      <div className="search-page-container">
        {/* will be mapped to search result */}
        {!searchList
          ? <div>No Result found!</div>
          : <div>
              <MovieList movieList={searchList.movieResult}/>
              <ShowList showList={searchList.showResult}/>

            </div>
        }
      </div>
    )
  }
  
  export default SearchPage