import { Link } from 'react-router-dom'
import '../../styles/home/searchBar.css'
import { Router, useNavigate } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

const SearchBar = (props) => {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [fullList, setFullList] = useState(null)
  const [filteredData, setFilteredData] = useState([])

  useEffect(() => {
    axios
      .get(`/api/search/autocomplete/list`)
      .then((res) => {
        console.log(res.data)
        setFullList(res.data)
      })
      // should ui if fetch fails
      .catch((e) => console.log('search fetch error: ', e))
  }, [])

  const handleFilter = (event) => {
    const searchWord = event.target.value
    setQuery(searchWord)
    const newFilter = fullList.filter((value) => {
      return value.name.toLowerCase().includes(query.toLowerCase())
    })

    if (searchWord === '') {
      setFilteredData([])
    } else {
      setFilteredData(newFilter)
    }
  }

  useEffect(() => {
    console.log(filteredData)
  }, [filteredData])

  return (
    <div className="search-bar-container">
      <label htmlFor="search-bar">Search:</label>
      <input
        id="search-bar"
        type="text"
        value={query}
        placeholder="Search movies and shows"
        onChange={handleFilter}
        onKeyPress={(event) => {
          console.log('key pressed')
          if (event.code === 'Enter') {
            if (query && query.trim().length > 0) navigate(`/search/${query}`)
          }
        }}
      />
      <button type="reset" onClick={() => setQuery('')}>
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
    </div>
  )
}

export default SearchBar
