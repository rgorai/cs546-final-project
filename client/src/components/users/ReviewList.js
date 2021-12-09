import '../../styles/users/reviewList.css'
import Review from './Review'

const ReviewList = (props) => {
  console.log(props.reviews)
  return (
    <>
      {props.reviews.length > 0 ? (
        <div className="review-list-container">
          {props.reviews.map((e, i) => (
            <Review key={i} {...e} />
          ))}
        </div>
      ) : (
        <div className="none-message">There are no reviews</div>
      )}
    </>
  )
}

export default ReviewList
