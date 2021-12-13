import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import '../../styles/users/review.css'

const Review = (props) => {
  return (
    <div className="review-container">
      {props.displayContentName && <h3>{props.contentName}</h3>}
      <div className="flex-horizontal">
        <div className="flex-horizontal like-dislike-container">
          <label htmlFor="user-review" className="desc-bold">
            {props.reviewer}
          </label>
          <div
            className={`like-button ${props.like_dislike === 1 ? 'liked' : ''}`}
          >
            <FontAwesomeIcon icon={faThumbsUp} className="icon" size="2x" />
          </div>
          <div
            className={`like-button ${
              props.like_dislike === 0 ? 'disliked' : ''
            }`}
          >
            <FontAwesomeIcon icon={faThumbsDown} className="icon" size="2x" />
          </div>
        </div>
        <div className="desc-bold">
          {moment(props.dateOfReview, 'YYYY-MM-DD').format('MM/DD/YYYY')}
        </div>
      </div>

      <div className="review-content">{props.review}</div>
    </div>
  )
}

export default Review
