import { useState } from 'react'
import '../../styles/menus/filterMenu.css'

const FilterMenu = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)

  const onSubmit = () => {
    console.log('filter submitted')
  }

  return (
    <>
      <button onClick={() => setShowDropdown(!showDropdown)}>Filter</button>
      {showDropdown ? 
        <div className="filter-dropdown">
          <form id="filter-form" onSubmit={onSubmit}>
            <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
            <label for="vehicle1">I have a bike</label>

            <div className="filter-button-container">
              <button className="form-reset" type="reset" form="filter-form">
                Reset
              </button>
              <button className="form-submit" type="submit" form="filter-form">
                Submit
              </button>
            </div>
          </form>
        </div>
        : null
      }
    </>
  )
}

export default FilterMenu