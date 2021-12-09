import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'
import '../../styles/users/review.css'

const Review = (props) => {
  return (
    <div className="review-container">
      <div className="flex-horizontal">
        <div className="flex-horizontal">
          <span htmlFor="" className="desc-bold">
            {props.reviewer}
          </span>
          <span className="like-dislike-container">
            <div
              className={`like-button ${
                props.like_dislike === 1 ? 'liked' : ''
              }`}
            >
              <FontAwesomeIcon
                icon={faThumbsUp}
                className="icon"
                id="thumbs-up"
                size="2x"
              />
            </div>
            <div
              className={`dislike-button ${
                props.like_dislike === 0 ? 'disliked' : ''
              }`}
            >
              <FontAwesomeIcon
                icon={faThumbsDown}
                className="icon"
                id="thumbs-down"
                size="2x"
              />
            </div>
          </span>
        </div>
        <div htmlFor="" className="desc-bold">
          {moment(props.dateOfReview, 'YYYY-MM-DD').format('MM/DD/YYYY')}
        </div>
      </div>

      <div className="desc">{props.review}</div>
    </div>
  )
}

export default Review
