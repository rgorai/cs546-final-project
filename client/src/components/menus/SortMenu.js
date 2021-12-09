import { useEffect, useState, useRef } from 'react'
import { useQueryState } from 'react-router-use-location-state'
import '../../styles/menus/sortMenu.css'

const SortMenu = (props) => {
  const { movieSortItems, DEFAULT_SORT, DEFAULT_ORDER } = props.props
  const dropdownRef = useRef()
  const [showDropdown, setShowDropdown] = useState(false)
  const [currSort, setCurrSort] = useQueryState('sort', DEFAULT_SORT)
  const [currAsc, setCurrAsc] = useQueryState('asc', DEFAULT_ORDER)

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
    <>
      <button onClick={() => setShowDropdown(!showDropdown)}>Sort</button>
      {showDropdown && (
        <div className="movienav-dropdown" ref={dropdownRef}>
          {Object.keys(movieSortItems).map((k, i) => (
            <div key={i} onClick={() => setCurrSort(k)}>
              <input
                type="radio"
                id={k}
                className="moviesort-item"
                name="moviesort-group"
                checked={currSort === k}
              />
              <label htmlFor={k}>{movieSortItems[k].text}</label>
            </div>
          ))}

          <button
            className="curr-asc-button"
            onClick={() => setCurrAsc(!currAsc)}
          >
            {currAsc ? 'Ascending' : 'Descending'}
          </button>
        </div>
      )}
    </>
  )
}

export default SortMenu
