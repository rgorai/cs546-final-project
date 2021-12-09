import { useEffect, useState } from 'react'
import { useQueryState } from 'react-router-use-location-state'
// import '../../styles/menus/sortMenu.css'

const ShowSortMenu = (props) => {
  const { showSortItems, DEFAULT_SORT, DEFAULT_ORDER } = props.props
  const [showDropdown, setShowDropdown] = useState(false)
  const [currSort, setCurrSort] = useQueryState('sort', DEFAULT_SORT)
  const [currAsc, setCurrAsc] = useQueryState('asc', DEFAULT_ORDER)

  return (
    <>
      <button onClick={() => setShowDropdown(!showDropdown)}>Sort</button>
      {showDropdown ? (
        <div className="shownav-dropdown">
          {Object.keys(showSortItems).map((k, i) => (
            <div key={i}>
              <input
                type="radio"
                id={k}
                className="showsort-item"
                name="showsort-group"
                onChange={() => setCurrSort(k)}
                checked={currSort === k}
              />
              <label htmlFor={k}>{showSortItems[k].text}</label>
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

export default ShowSortMenu
