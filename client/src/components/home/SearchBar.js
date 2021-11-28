import { Link } from 'react-router-dom'
import '../../styles/home/searchBar.css'
import { Router, useNavigate } from 'react-router'
import { useState } from 'react';

const SearchBar = (props) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState(null);


  return (
    <div className="search-bar-container">
      <input
        id="search-bar"
        type="text"
        value = {query}
        placeholder="Search movies and shows"
        onChange={e => setQuery(e.target.value)}
      />
      <button 
        type="reset"
        onClick={() => setQuery('')}
        >
        &times;
      </button>
      <button
        id="search-button"
        type="submit"
        // onSubmit={() => { if(query && query.trim().length > 0) navigate(`/search/${query}`)} }
        onClick={() =>{ if(query && query.trim().length > 0) navigate(`/search/${query}`)}}
      >
        Search
      </button>  
    </div>
  )
}

export default SearchBar