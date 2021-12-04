import { useEffect, useState } from 'react'
import '../../styles/menus/sortMenu.css'

const SortMenu = (props) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [ascending, setAscending] = useState(true)
  const [currSort, setCurrSort] = useState('title')
  const { items, movies, setMovies } = props

  // useEffect(() => {
  //   sortMovies({ target: { id: currSort } })
  // }, [ascending])

  const sortMovies = (event) => {
    const k = event.target.id
    setCurrSort(k)

    console.log(ascending)

    if (movies.length > 0) {
      // console.log('hello', movies)
      const t = movies.sort(
        (x, y) => (ascending ? 1 : -1) * items[k].compare(x[k], y[k])
      )
      props.setMovies(t)
      console.log('there', t)
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
      {showDropdown ? (
        <div className="movienav-dropdown">
          {Object.keys(items).map((k, i) => (
            <div key={i}>
              <input
                type="radio"
                id={k}
                className="moviesort-item"
                name="moviesort-group"
                onChange={sortMovies}
              />
              <label htmlFor={k}>{items[k].text}</label>
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
