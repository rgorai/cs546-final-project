import { useEffect, useState } from 'react'
import Post from './Show'

const PostList = (props) => {
  const [postList, setPostList] = useState([])

  useEffect(() => {
    fetch('/posts')
      .then((res) => res.json())
      .then((posts) => setPostList(posts))
      .catch((e) => console.log('post fetch error: ', e))
  })
  // console
  return (
    <div className="post-list-container">
      {postList.map((post, i) => (
        <Post 
          key={i}
          title={post.title}
          posterName={post.poster.name}
          body={post.body}
        />
      ))}
    </div>
  )
}

export default PostList