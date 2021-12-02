const mongoCollections = require('../config/mongoCollections')
const errors = require('./errors')
const showCollection = mongoCollections.shows
const movieCollection = mongoCollections.movies
const userCollection = mongoCollections.users
const { ObjectId } = require('mongodb')
const { reviews } = require('../config/mongoCollections')

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
  _id = new ObjectId()
  shows = await showCollection()
  show = await shows.findOne({ _id: contentId })
  // console.log(show);

  const movies = await movieCollection()
  const movie = await movies.findOne({ _id: contentId })
  // console.log(movie);

  const users = await userCollection()
  const user = await users.findOne({ _id: reviewerId })
  // console.log(user);

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

  if (!movie) {
    inserted = await shows.updateOne(
      { _id: contentId },
      { $push: { reviews: newReview } }
    )
    if (inserted.modifiedCount === 0) throw 'Could not update the show'
  }

  if (!show) {
    inserted = await movies.updateOne(
      { _id: contentId },
      { $push: { reviews: newReview } }
    )
    if (inserted.modifiedCount === 0) throw 'Could not update the shows'
  }

  inserted = await users.updateOne(
    { _id: reviewerId },
    { $push: { reviews: newReview } }
  )
  if (inserted.modifiedCount === 0) throw 'Could not update the shows'
  const createdReview = await users.findOne({ 'reviews.contentId': contentId })
  // console.log(createdReview);
  return createReview
}

const removeReview = async (contentId, reviewId) => {
  let removed, removedContent
  contentId = errors.validateObjectId(contentId)
  reviewId = errors.validateObjectId(reviewId)
  const shows = await showCollection()
  const show = await shows.findOne({ _id: contentId })

  const movies = await movieCollection()
  const movie = await movies.findOne({ _id: contentId })

  const users = await userCollection()
  console.log(await users.findOne({ 'reviews._id': reviewId }))

  if (!show)
    removedContent = await movies.updateOne(
      { _id: contentId },
      { $pull: { reviews: { _id: ObjectId(reviewId) } } }
    )

  if (!movie)
    removedContent = await shows.updateOne(
      { _id: contentId },
      { $pull: { reviews: { _id: reviewId } } }
    )

  const userReview = await users.updateOne(
    { 'reviews._id': reviewId },
    { $pull: { reviews: { _id: ObjectId(reviewId) } } }
  )

  if (!userReview.matchedCount && !userReview.modifiedCount)
    throw 'Failed to remove review from users'

  if (!removedContent.matchedCount && !removedContent.modifiedCount)
    throw 'Failed to remove review from content'

  const user = await users.findOne({ 'reviews._id': reviewId })
  // console.log(user);
  return user
}

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
  review = errors.validateReview(review)
  const movies = await movieCollection()
  const shows = await showCollection()
  const users = await userCollection()

  // const movie = await movies.find({ reviews: { $elemMatch: { _id: ObjectId(reviewId) } } }).toArray();
  const movie = await movies.findOne({ 'reviews._id': reviewId })
  // console.log(movie);
  // const show = await shows.find({ reviews: { $elemMatch: { _id: ObjectId(reviewId) } } }).toArray();
  const show = await shows.findOne({ 'reviews._id': reviewId })
  // console.log(show);
  // const user = await users.find({ reviews: { $elemMatch: { _id: ObjectId(reviewId) } } }).toArray();
  const user = await users.findOne({ 'reviews._id': reviewId })
  // console.log(user);

  const newReview = {
    _id: reviewId,
    reviewerId: reviewerId,
    reviewer: reviewer,
    contentId: contentId,
    dateOfReview: dateOfReview,
    review: review,
    like_dislike: like_dislike,
  }

  if (!show) {
    updatedContent = await movies.updateOne(
      { _id: contentId },
      { $pull: { reviews: { _id: reviewId } } }
    )
    updatedContent = await movies.updateOne(
      { _id: contentId },
      { $push: { reviews: newReview } }
    )
  }

  // const query = { _id: ObjectId(contentId), "reviews._id": ObjectId(reviewId) }

  // const updatedReview = {
  //   $set:
  //   {
  //     "reviews.$.reviewerId": reviewerId,
  //     "reviews.$.reviewer": reviewer,
  //     "reviews.$.contentId": contentId,
  //     "reviews.$.dateOfReview": dateOfReview,
  //     "reviews.$.review": review,
  //     "reviews.$.like_dislike": like_dislike
  //   }
  // }

  // if(!show) {
  // }

  // if(!movie) {
  // updated = await shows.updateOne({ _id: ObjectId(contentId) }, { $set: updatedReview });
  // }

  if (!movie) {
    updatedContent = await shows.updateOne(
      { _id: contentId },
      { $pull: { reviews: { _id: reviewId } } }
    )

    updatedContent = await shows.updateOne(
      { _id: contentId },
      { $push: { reviews: newReview } }
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

  // updatedUser = await users.updateOne({ _id: ObjectId(reviewerId) }, { $set: updatedReview });

  if (updatedUser.modifiedCount === 0) {
    throw 'Could not update review for user'
  }
  // if (updatedUser.modifiedCount === 0) {
  //   throw 'Could not update user successfully';
  // }

  const updatedReview = await users.findOne({ 'reviews.contentId': contentId })
  // console.log(updatedReview);
  return updatedReview
}

module.exports = {
  createReview,
  removeReview,
  updateReview,
}
