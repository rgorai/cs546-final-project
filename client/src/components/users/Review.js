import { useState } from 'react'
import '../../styles/users/review.css'

const Review = (props) => {
  return (
    <div className="previous-reviews desc">
      <h3>Previous Reviews</h3>
      <label htmlFor="" className="desc-bold">
        User
      </label>
      <label htmlFor="" className="desc-bold">
        Date Of Review
      </label>
      <label htmlFor="" className="desc-bold">
        Liked / Disliked
      </label>
      <p className="desc">Review</p>
    </div>
  )
}

export default Review
