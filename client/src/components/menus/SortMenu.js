import { useEffect, useState, useRef } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import '../../styles/menus/sortMenu.css'

const SortMenu = (props) => {
  const { movieSortItems, DEFAULT_SORT, DEFAULT_ORDER } = props.props
  const [queryString, setQueryString] = useSearchParams()
  const [showDropdown, setShowDropdown] = useState(false)
  const [currSort, setCurrSort] = useState(
    queryString.get('sort') || DEFAULT_SORT
  )
  const [currAsc, setCurrAsc] = useState(
    queryString.get('asc') === 'true' || DEFAULT_ORDER
  )

  // update query string when sort settings change
  useEffect(() => {
    console.log('sort-menu', currSort, currAsc)
    setQueryString({ sort: currSort, asc: currAsc })
  }, [currSort, currAsc, setQueryString])

  return (
    <>
      <button onClick={() => setShowDropdown(!showDropdown)}>Sort</button>
      {showDropdown ? (
        <div className="movienav-dropdown">
          {Object.keys(movieSortItems).map((k, i) => (
            <div key={i}>
              <input
                type="radio"
                id={k}
                className="moviesort-item"
                name="moviesort-group"
                onChange={() => setCurrSort(k)}
                checked={currSort === k}
              />
              <label htmlFor={k}>{movieSortItems[k].text}</label>
            </div>
          ))}

          <button
            className="currAsc-button"
            onClick={() => setCurrAsc(!currAsc)}
          >
            {currAsc ? 'Ascending' : 'Descending'}
          </button>
        </div>
      ) : null}
    </>
  )
}

export default SortMenu
