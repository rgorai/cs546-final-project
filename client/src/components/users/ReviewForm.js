/* eslint-disable no-throw-literal */
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

import { postReview } from '../../services/userService'
import { getCurrUser } from '../../services/authService'
import '../../styles/users/reviewForm.css'

const ReviewForm = (props) => {
  const navigate = useNavigate()
  const location = useLocation()
  const currUser = getCurrUser()

  const [showForm, setShowForm] = useState(false)
  const [liked, setLiked] = useState(false)
  const [disliked, setDisliked] = useState(false)
  const [review, setReview] = useState('')
  const [error, setError] = useState(null)

  const onWriteClick = (e) => {
    e.preventDefault()
    if (!currUser) navigate('/login', { state: { from: location.pathname } })
    else setShowForm(!showForm)
  }

  const onLike = (e) => {
    e.preventDefault()
    setLiked(true)
    setDisliked(false)
  }

  const onDislike = (e) => {
    e.preventDefault()
    setDisliked(true)
    setLiked(false)
  }

  const onFormSubmit = (e) => {
    e.preventDefault()

    // error check
    try {
      if (!(liked || disliked)) throw 'Please enter a rating'
      if (review.trim().length === 0) throw 'Please enter a review'
    } catch (e) {
      return setError(e)
    }

    // post data to server
    postReview({
      contentId: props.contentId,
      contentName: props.contentName,
      review: review,
      like_dislike: liked ? 1 : 0,
    })
      .then((_) => window.location.reload())
      .catch((e) => console.log(e.response))
  }

  // need to add protected write review button
  return (
    <>
      {showForm ? (
        <form id="review-form" onSubmit={onFormSubmit}>
          <div className="flex-horizontal like-dislike-container">
            <label htmlFor="user-review" className="desc-bold">
              {currUser.username}
            </label>
            <button
              className={`form-like-button ${liked ? 'liked' : ''}`}
              onClick={onLike}
              form="review-form"
            >
              <FontAwesomeIcon icon={faThumbsUp} className="icon" size="2x" />
            </button>
            <button
              className={`form-dislike-button ${disliked ? 'disliked' : ''}`}
              onClick={onDislike}
              form="review-form"
            >
              <FontAwesomeIcon icon={faThumbsDown} className="icon" size="2x" />
            </button>
          </div>
          <textarea
            name="user-review"
            id="user-review"
            cols="40"
            rows="3"
            placeholder="Write your review here..."
            form="review-form"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            autoFocus
          />

          <div className="review-form-buttons">
            <div>
              <button className="form-submit" type="submit" form="review-form">
                Post Review
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="watchlist-remove"
              >
                Cancel
              </button>
            </div>
            {error && <div className="form-error">{error}</div>}
          </div>
        </form>
      ) : (
        <button className="review-button" onClick={onWriteClick}>
          Write a review
        </button>
      )}
    </>
  )
}

export default ReviewForm
