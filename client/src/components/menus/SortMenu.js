import { useState } from 'react'
import '../../styles/menus/sortMenu.css'

const SortMenu = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [ascending, setAscending] = useState(true)

  const sortMovies = (event) => {
    console.log(event.target.id)
    if (props.movies.length > 0) {
      console.log(props.movies)
      const movies = props.movies.sort((x, y) => (
        (ascending?-1 : 1) * props.items.find((e)=> e.name === event.target.id).compare(x, y, event.target.id)
      ))
      props.setMovies(movies)
      console.log(movies)
    }
  }

  return (
    <>
      <button onClick={() => setShowDropdown(!showDropdown)}>Sort</button>
      {showDropdown ? 
        <div className="movienav-dropdown">
          {props.items.map((e, i) => (
            <div key={i}>
              <input type="radio" id={e.name} className="moviesort-item" name="moviesort-group" onChange={sortMovies} />
              <label htmlFor={e.name}>{e.text}</label>
            </div>
          ))  
}
          <button className="ascending-button" onClick={() => setAscending(!ascending)}>
            {ascending
            ? 'Ascending'
          : 'Descending'}
          </button>
        </div>
        : null
      }
    </>
  )
}

export default SortMenu
