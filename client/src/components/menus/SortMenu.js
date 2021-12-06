import { useEffect, useState, useRef, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import '../../styles/menus/sortMenu.css'

const DEFAULT_SORT = 'name'
const DEFAULT_ORDER = 'false'

const SortMenu = (props) => {
  const [queryString, setQueryString] = useSearchParams()
  const [showDropdown, setShowDropdown] = useState(false)
  const [currSort, setCurrSort] = useState(DEFAULT_SORT)
  const [ascending, setAscending] = useState(false)
  // const ascending = useRef(false)
  const [permToWrite, setPermToWrite] = useState(false)

  // get querystring params
  const sortMethod = useRef(queryString.get('sort'))
  const orderMethod = useRef(queryString.get('asc'))

  // set default querystring
  // useEffect(() => {
  //   if (!queryString.get('sort')) sortMethod.current = DEFAULT_SORT
  //   if (!queryString.get('asc')) orderMethod.current = DEFAULT_ORDER
  //   setQueryString({
  //     sort: sortMethod.current,
  //     asc: orderMethod.current,
  //   })
  //   console.log('in here')
  // }, [queryString, setQueryString])

  // update querystring based on current and set values
  useEffect(() => {
    const sort = queryString.get('sort')
    const asc = queryString.get('asc')
    console.log('sort_menu', sort, asc)

    // if (!sort) setQueryString({ ...queryString, sort: DEFAULT_SORT })
    // if (!asc) setQueryString({ ...queryString, asc: DEFAULT_ORDER })

    if (!permToWrite)
      setQueryString({
        sort: sort ? sort : DEFAULT_SORT,
        asc: asc ? asc : DEFAULT_ORDER,
      })
    setPermToWrite(true)
  }, [queryString, setQueryString, permToWrite, setPermToWrite])
  useEffect(() => {
    console.log('currsort')
    if (permToWrite) {
      console.log('currsort changing', queryString)
      setQueryString({ ...queryString, sort: currSort })
    }
  }, [permToWrite, queryString, setQueryString, currSort])
  useEffect(() => {
    console.log('ascending')
    if (permToWrite) {
      console.log('ascending changing', queryString)
      setQueryString({ ...queryString, asc: ascending })
    }
  }, [permToWrite, queryString, setQueryString, ascending])

  // const updateQueryString = useCallback(
  //   (k, val) => {
  //     console.log('updating_qs')
  //     setQueryString({ ...queryString, [k]: val })
  //   },
  //   [queryString, setQueryString]
  // )

  // useEffect(() => {
  //   console.log('currsort', currSort)
  //   updateQueryString('sort', currSort)
  // }, [currSort, updateQueryString])

  // useEffect(() => {
  //   console.log('asc', ascending)
  //   updateQueryString('asc', ascending)
  // }, [ascending, updateQueryString])

  // const sortMovies = (event) => {
  //   const k = event.target.id
  //   // console.log(k)
  //   // sortMethod.current = k
  //   setQueryString({
  //     sort: k,
  //     asc: orderMethod.current
  //   })
  // }

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
                onChange={() => setCurrSort(k)}
                checked={currSort === k}
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
