const { ObjectId } = require('mongodb')
const mongoCollections = require('../config/mongoCollections')
const errors = require('./errors')
const showCollection = mongoCollections.shows
const movieCollection = mongoCollections.movies
const userCollection = mongoCollections.users

// Function to update a collection
const updateCollection = async (collection) => {
  collection.reviews.push(newReview)

  const updatedInfo = await collection.updateOne(
    { _id: ObjectId(collection._id) },
    {
      $push: { reviews: newReview },
      $set: { overallRating: newOverallRating },
    }
  )

  if (updatedInfo.modifiedCount !== 1) {
    errors.throwError(
      errors.ErrorCode.INTERNAL_SERVER_ERROR,
      'Error: Could not add review.'
    )
  }

  return await getReview(newReview._id)
}

//create review for a specific userId
const createReview = async (
  reviewerId,
  reviewer,
  contentId,
  dateOfReview,
  review,
  like_dislike
) => {
  try {
    // console.log(reviewerId, reviewer, contentId, dateOfReview, review, like_dislike);
    // console.log(reviewerId)
    console.log(arguments.length)
    errors.validateTotalArguments(arguments.length)
    const reviewerId = errors.validateObjectId(reviewerId)
    const reviewer = errors.validateReviewer(reviewer)
    const dateOfReview = errors.validateDateOfReview(dateOfReview)
    const contentId = errors.validateObjectId(contentId)
    const review = errors.validateReview(review)
    const like_dislike = errors.validateLikeDislike(like_dislike)

    const users = await userCollection()
    const user = await users.findOne({ _id: contentId })

    const movies = await movieCollection()
    const movie = await movies.findOne({ _id: contentId })

    const shows = await showCollection()
    const show = await shows.findOne({ _id: contentId })

    if (!user) throw 'Error: failed to find user.'

    if (!movie && !user)
      throw 'Error: failed to find the content you are looking for.'

    const newReview = {
      _id: ObjectId(),
      reviewerId: reviewerId,
      reviewer: reviewer,
      contentId: contentId,
      dateOfReview: dateOfReview,
      review: review,
      like_dislike: like_dislike,
    }

    if (!movie) {
      updateCollection(shows)
      updateCollection(users)
    }

    if (!show) {
      updateCollection(movies)
      updateCollection(users)
    }
  } catch (error) {
    errors.throwCatchError(error)
  }
}

// Delete review
const remove = async (reviewId) => {
  try {
    const parsedObjectId = ObjectId(id)

    const users = await userCollection()

    const userReview = await users.findOne({
      'reviews._id': parsedObjectId,
    })

    if (!userReview) {
      errors.throwError(
        errors.ErrorCode.NOT_FOUND,
        'Error: No review with that id.'
      )
    }

    const nonRemovedReviews = userReview.reviews.filter((currentReview) => {
      return currentReview._id.toString() !== reviewId
    })

    let newOverallRating = 0

    if (nonRemovedReviews.length > 0) {
      newOverallRating = calculateAvgReviews(nonRemovedReviews)
    }

    const updatedInfo = await restaurantCollection.updateOne(
      { _id: restaurantWithReview._id },
      {
        $pull: { reviews: { _id: parsedObjectId } },
        $set: { overallRating: newOverallRating },
      }
    )

    if (updatedInfo.modifiedCount !== 1) {
      errors.throwError(
        errors.ErrorCode.INTERNAL_SERVER_ERROR,
        'Error: Could not remove review.'
      )
    }

    return { reviewId: _reviewId, deleted: true }
  } catch (error) {
    errors.throwCatchError(error)
  }
}

// Update a specific review
const updateReview = async (
  userId,
  reviewId,
  contentId,
  dateOfReview,
  review,
  like_dislike
) => {
  const parsedUserId = ObjectId(userId)
  const parsedReviewId = ObjectId(reviewId)
  const users = await userCollection()
  const user = await users.findOne({ reviews_id: parsedReviewId })

  const updatedReview = {
    _id: parsedReviewId,
    reviewerId: parsedUserId,
    reviewer: user.username,
    contentId: contentId,
    dateOfReview: dateOfReview,
    review: review,
    like_dislike: like_dislike,
  }

  const updatedInfo = await users.updateOne(
    { _id: parsedUserId },
    { $set: updatedReview }
  )

  if (updatedInfo.modifiedCount !== 1) {
    errors.throwError(
      errors.ErrorCode.INTERNAL_SERVER_ERROR,
      'Error: Could not update restaurant.'
    )
  }

  return user
}

// Calculate Overall Ratings
const calculateAvgReviews = (reviews) => {
  let totalCount = 0
  let sum = 0

  for (currentReview of reviews) {
    sum += currentReview.rating
    totalCount++
  }

  return sum / totalCount
}

module.exports = {
  createReview,
  updateReview,
  remove,
}
