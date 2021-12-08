import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import '../../styles/users/review.css'

const Review = (props) => {
  const reviewContent = (
    <>
      <div className="like-dislike">
        <label htmlFor="thumbs-up">
          Like:
          <FontAwesomeIcon
            icon={faThumbsUp}
            className="icon"
            id="thumbs-up"
            size="2x"
          />
        </label>
        <label htmlFor="thumbs-down">
          {' '}
          Dislike:
          <FontAwesomeIcon
            icon={faThumbsDown}
            className="icon"
            id="thumbs-down"
            size="2x"
          />
        </label>
      </div>
      <div className="reviews-container">
        <label htmlFor="userReview" className="desc-bold">
          My Review :
          <textarea
            name="user-review"
            id="user-review"
            cols="100"
            rows="1"
            placeholder="Write your review here..."
          ></textarea>
        </label>
        <button>Post Review</button>
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
      </div>
    </>
  )

  return (
    <div className="review-wrapper">
      {props.display ? <form action=""></form> : null}
    </div>
  )
}

export default Review
