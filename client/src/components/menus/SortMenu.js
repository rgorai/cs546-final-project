import { useState } from 'react'
import '../../styles/menus/sortMenu.css'

const SortMenu = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [ascending, setAscending] = useState(true)
  const {
    items,
    movies,
    setMovies
  } = props

  const sortMovies = (event) => {
    if (movies.length > 0) {
      movies.sort((x, y) => (
        (ascending?-1 : 1) * items.find((e)=> e.name === event.target.id).compare(x, y, event.target.id)
      ))
      setMovies(movies)
      // console.log(movies)
    }
  }
  // const sortMovies = (event) => {
  //   console.log(movies)
  //   const movies = movies
  //   movies.forEach((e) => {
  //     console.log(e.name)
  //   })
  //   movies.sort((x, y) => x.name < y.name ? -1 : 1)
  //   console.log(movies)
  // }

  return (
    <>
      <button onClick={() => setShowDropdown(!showDropdown)}>Sort</button>
      {showDropdown ? 
        <div className="movienav-dropdown">
          {Object.keys(items).map((k, i) => (
            <div key={i}>
              <input type="radio" id={k} className="moviesort-item" name="moviesort-group" onChange={sortMovies} />
              <label htmlFor={k}>{items[k].text}</label>
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
