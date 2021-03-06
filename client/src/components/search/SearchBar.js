import { Link } from 'react-router-dom'
import '../../styles/home/searchBar.css'
import { useNavigate } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import axios from 'axios'
// import router from '../../../../server/routes/search'

const SearchBar = (props) => {
  const navigate = useNavigate()
  const dropdownRef = useRef()
  const [showDropdown, setShowDropdown] = useState(false)
  const [query, setQuery] = useState('')
  const [fullList, setFullList] = useState(null)
  const [filteredData, setFilteredData] = useState(null)

  useEffect(() => {
    axios
      .get(`/api/search/autocomplete/list`)
      .then((res) => {
        // console.log(res.data)
        setFullList(res.data)
      })
      .catch((e) => console.log('search fetch error: ', e))
  }, [])

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setQuery(searchWord)
    let newFilter = {}
    newFilter['movies'] = fullList.movieResult.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    })
    newFilter['shows'] = fullList.showResult.filter((value) => {
      return value.name.toLowerCase().includes(searchWord.toLowerCase())
    })

    if (searchWord === '') {
      setFilteredData(null)
    } else {
      setFilteredData(newFilter)
      setShowDropdown(true)
    }
  }

  // close sort menu when user clicks outside
  useEffect(() => {
    const clickedOutside = (e) => {
      if (
        showDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      )
        setShowDropdown(false)
    }
    document.addEventListener('mousedown', clickedOutside)
    return () => {
      document.removeEventListener('mousedown', clickedOutside)
    }
  }, [showDropdown])

  return (
    <div className="flex-horizontal search-bar-container">
      <label htmlFor="search-bar"></label>
      <input
        id="search-bar"
        type="text"
        value={query}
        placeholder="Search movies and shows"
        className="searchInput"
        autoComplete="off"
        onChange={handleFilter}
        onKeyPress={(event) => {
          if (event.code === 'Enter') {
            if (query && query.trim().length > 0) navigate(`/search/${query}`)
          }
          setShowDropdown(false)
        }}
        onClick={() => (filteredData ? setShowDropdown(true) : null)}
      />
      <button
        className="search-reset-button"
        type="reset"
        onClick={() => {
          setFilteredData(null)
          setQuery('')
        }}
      >
        &times;
      </button>
      <button
        id="search-button"
        type="submit"
        onClick={() => {
          if (query && query.trim().length > 0) navigate(`/search/${query}`)
        }}
      >
        Search
      </button>
      {showDropdown && filteredData && (
        <div className="autocomplete-div" ref={dropdownRef}>
          <strong className="result-title">Movies</strong>
          {filteredData.movies.length === 0 && <p>No Results found!</p>}
          {filteredData.movies.map((i) => (
            <Link
              to={`movies/single/${i._id}`}
              onClick={() => setShowDropdown(false)}
            >
              {i.name}
            </Link>
          ))}
          <strong className="result-title">Shows</strong>
          {filteredData.shows.length === 0 && <p>No Results found!</p>}
          {filteredData.shows.map((i) => (
            <Link
              to={`shows/single/${i._id}`}
              onClick={() => setShowDropdown(false)}
            >
              {i.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
