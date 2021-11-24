import { useEffect, useState } from 'react'
import ShowCard from './ShowCard'
import axios from 'axios'
// import Post from './ShowPage'

const ShowList = (props) => {
  const [showList, setshowList] = useState([])

  useEffect(() => {
    axios.get('/shows')
      .then((res) => setshowList(res.data))
      // should ui if fetch fails
      .catch((e) => console.log('show fetch error: ', e))
  }, [])

  // useEffect(() => {
  //   fetch('/posts')
  //     .then((res) => res.json())
  //     .then((posts) => setPostList(posts))
  //     .catch((e) => console.log('post fetch error: ', e))
  //   console.log(postList)
  // })
  // console
  return (
    <div className="show-list-container">
      {showList.length === 0
        ? <div>error</div>
        : showList.map((show, i) => (
            <ShowCard 
              key={i}
              id={show._id}
              posterPath={show.posterPath}
              name={show.name}
            />
          ))
        }
    </div>
  )
}

export default ShowList