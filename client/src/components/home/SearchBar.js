import { Link } from 'react-router-dom'
import '../../styles/home/searchBar.css'

const SearchBar = (props) => {
  
  return (
    <div className="search-bar-container">
      <input
        id="search-bar"
        type="text"
        placeholder="Search movies and shows"
      />
      <button
        id="search-button"
      >
        Search
      </button>  
    </div>
  )
}

export default SearchBar