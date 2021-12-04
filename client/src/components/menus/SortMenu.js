import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../styles/menus/sortMenu.css'

const SortMenu = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [ascending, setAscending] = useState(false)
  const [queryString, setQueryString] = useSearchParams()

  // get querystring params
  let sortMethod = queryString.get('sort')
  const orderMethod = queryString.get('ascending')

  const sortMovies = (event) => {
    const k = event.target.id
    console.log(k)
  }

  // update querystring when sort menu used
  useEffect((e) => {}, [orderMethod])

  return (
    <>
      <button onClick={() => setShowDropdown(!showDropdown)}>Sort</button>
      {showDropdown ? (
        <div className="movienav-dropdown">
          {Object.keys(props.movieSortItems).map((k, i) => (
            <div key={i}>
              <input
                type="radio"
                id={k}
                className="moviesort-item"
                name="moviesort-group"
                onChange={sortMovies}
              />
              <label htmlFor={k}>{props.movieSortItems[k].text}</label>
            </div>
          ))}

          <button
            className="ascending-button"
            onClick={() => setAscending(!ascending)}
          >
            {ascending ? 'Ascending' : 'Descending'}
          </button>
        </div>
      ) : null}
    </>
  )
}

export default SortMenu
