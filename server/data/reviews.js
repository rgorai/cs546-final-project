const mongoCollections = require('../config/mongoCollections')
const errors = require('./errors')
const showCollection = mongoCollections.shows
const movieCollection = mongoCollections.movies
const userCollection = mongoCollections.users
const { ObjectId } = require('mongodb')
const { reviews } = require('../config/mongoCollections')

// Create a new review
const createReview = async (
  reviewerId,
  reviewer,
  contentId,
  dateOfReview,
  review,
  like_dislike
) => {
  let inserted
  reviewerId = errors.validateObjectId(reviewerId)
  reviewer = errors.validateReviewer(reviewer)
  contentId = errors.validateObjectId(contentId)
  dateOfReview = errors.validateDateOfReview(dateOfReview)
  review = errors.validateReview(review)
  like_dislike = errors.validateLikeDislike(like_dislike)
  const _id = new ObjectId()

  const shows = await showCollection()
  const show = await shows.findOne({ _id: contentId })

  const movies = await movieCollection()
  const movie = await movies.findOne({ _id: contentId })

  const users = await userCollection()
  const user = await users.findOne({ _id: reviewerId })

  const newReview = {
    _id: _id,
    reviewerId: reviewerId,
    reviewer: reviewer,
    dateOfReview: dateOfReview,
    contentId: contentId,
    review: review,
    like_dislike: like_dislike,
  }

  if (!movie && !show) {
    throw 'content does not exist'
  }

  if (show) {
    const percent = overallRating(show, like_dislike, 1)
    inserted = await shows.updateOne(
      { _id: contentId },
      {
        $set: { overall_rating: Number(percent) },
        $push: { reviews: newReview },
      }
    )
    if (inserted.modifiedCount === 0) throw 'Could not update the show'
  }

  if (movie) {
    const percent = overallRating(movie, like_dislike, 1)
    inserted = await movies.updateOne(
      { _id: contentId },
      {
        $set: { overallRating: Number(percent) },
        $push: { reviews: newReview },
      }
    )
    if (inserted.modifiedCount === 0) throw 'Could not update the movie'
  }

  inserted = await users.updateOne(
    { _id: reviewerId },
    { $push: { reviews: newReview } }
  )
  if (inserted.modifiedCount === 0) throw 'Could not update the user'
  const createdReview = await users.findOne({ _id: reviewerId })

  return createdReview.reviews
}

// Remove a review
const removeReview = async (contentId, reviewId) => {
  let removedContent, reviewToRemove
  contentId = errors.validateObjectId(contentId)
  reviewId = errors.validateObjectId(reviewId)

  const shows = await showCollection()
  const show = await shows.findOne({ _id: contentId })

  const movies = await movieCollection()
  const movie = await movies.findOne({ _id: contentId })

  const users = await userCollection()

  if (movie) {
    reviewToRemove = await movies.findOne({ 'reviews._id': reviewId })
    reviewToRemove = reviewToRemove.reviews.find(
      (e) => String(e._id) === String(reviewId)
    )
    const rating = reviewToRemove.like_dislike
    const percent = overallRating(movie, -rating, -1)
    removedContent = await movies.updateOne(
      { _id: contentId },
      {
        $set: { overall_rating: Number(percent) },
        $pull: { reviews: { _id: ObjectId(reviewId) } },
      }
    )
  }

  if (show) {
    reviewToRemove = await shows.findOne({ 'reviews._id': reviewId })
    reviewToRemove = reviewToRemove.reviews.find(
      (e) => String(e._id) === String(reviewId)
    )
    const rating = reviewToRemove.like_dislike
    const percent = overallRating(show, -rating, -1)
    removedContent = await shows.updateOne(
      { _id: contentId },
      {
        $set: { overall_rating: Number(percent) },
        $pull: { reviews: { _id: reviewId } },
      }
    )
  }

  const userReview = await users.updateOne(
    { 'reviews._id': reviewId },
    { $pull: { reviews: { _id: ObjectId(reviewId) } } }
  )

  if (!userReview.matchedCount && !userReview.modifiedCount)
    throw 'Failed to remove review from users'

  if (!removedContent.matchedCount && !removedContent.modifiedCount)
    throw 'Failed to remove review from content'

  return { removedReview: true }
}

// Update a review
const updateReview = async (
  reviewId,
  reviewerId,
  reviewer,
  contentId,
  dateOfReview,
  review,
  like_dislike
) => {
  let updatedContent, updatedUser
  reviewId = errors.validateObjectId(reviewId)
  reviewerId = errors.validateObjectId(reviewerId)
  reviewer = errors.validateReviewer(reviewer)
  contentId = errors.validateObjectId(contentId)
  dateOfReview = errors.validateDateOfReview(dateOfReview)
  like_dislike = errors.validateLikeDislike(like_dislike)
  review = errors.validateReview(review)

  const movies = await movieCollection()
  const shows = await showCollection()
  const users = await userCollection()

  const movie = await movies.findOne({ 'reviews._id': reviewId })
  const show = await shows.findOne({ 'reviews._id': reviewId })

  const newReview = {
    _id: reviewId,
    reviewerId: reviewerId,
    reviewer: reviewer,
    contentId: contentId,
    dateOfReview: dateOfReview,
    review: review,
    like_dislike: like_dislike,
  }

  if (movie) {
    const percent = overallRating(movie, like_dislike, 0, reviewId)
    updatedContent = await movies.updateOne(
      { _id: contentId },
      { $pull: { reviews: { _id: reviewId } } }
    )
    updatedContent = await movies.updateOne(
      { _id: contentId },
      {
        $set: { overall_rating: Number(percent) },
        $push: { reviews: newReview },
      }
    )
  }

  if (show) {
    const percent = overallRating(show, like_dislike, 0, reviewId)
    updatedContent = await shows.updateOne(
      { _id: contentId },
      { $pull: { reviews: { _id: reviewId } } }
    )

    updatedContent = await shows.updateOne(
      { _id: contentId },
      {
        $set: { overall_rating: Number(percent) },
        $push: { reviews: newReview },
      }
    )
  }

  if (updatedContent.modifiedCount === 0) {
    throw 'Could not update review for content'
  }

  updatedUser = await users.updateOne(
    { _id: reviewerId },
    { $pull: { reviews: { _id: reviewId } } }
  )
  updatedUser = await users.updateOne(
    { _id: reviewerId },
    { $push: { reviews: newReview } }
  )

  if (updatedUser.modifiedCount === 0) {
    throw 'Could not update review for user'
  }

  const updatedReview = await users.findOne({ 'reviews.contentId': contentId })

  return updatedReview
}

// Calculate Overall Rating based on likes
const overallRating = (content, newRating, lengthOffset, reviewId) => {
  let sum = newRating,
    percent = 0

  content.reviews
    .filter((e) => String(e._id) !== String(reviewId))
    .forEach((key) => {
      sum += key.like_dislike
    })

  percent = (sum / (content.reviews.length + lengthOffset)) * 100

  return percent
}

module.exports = {
  createReview,
  removeReview,
  updateReview,
}
