const express = require('express')
const router = express.Router()
const { verifyToken } = require('../middleware/auth')
const { createReview, removeReview, updateReview } = require('../data/reviews')
const { getUser } = require('../data/users')
const errors = require('../data/errors')
const { ObjectId } = require('mongodb')
let username

router.post('/', verifyToken, async (req, res) => {
  let { contentId, dateOfReview, review, like_dislike } = req.body

  if (!req.userId) {
    res.status(400).send('You must specify an ID of the user to post a review')
  }

  try {
    const user = await getUser(req.userId)
    username = user.username

    reviewerId = errors.validateObjectId(req.userId)
    reviewer = errors.validateReviewer(username)
    contentId = errors.validateObjectId(contentId)
    dateOfReview = errors.validateDateOfReview(dateOfReview)
    review = errors.validateReview(review)

    const createdReview = await createReview(
      reviewerId,
      reviewer,
      contentId,
      dateOfReview,
      review,
      like_dislike
    )

    res.status(200).json(createdReview)
  } catch (e) {
    return res.status(400).send(String(e))
  }
})

router.put('/', verifyToken, async (req, res) => {
  let { reviewId, reviewer, contentId, dateOfReview, review, like_dislike } =
    req.body

  if (!req.userId) {
    res
      .status(400)
      .send('You must specify an ID of the user to update the review')
  }

  try {
    const user = await getUser(req.userId)
    username = user.username
  } catch (e) {
    res.status(500).send('User not found')
  }

  // Error Checking

  try {
    reviewId = errors.validateObjectId(reviewId)
    reviewerId = errors.validateObjectId(req.userId)
    reviewer = errors.validateReviewer(username)
    contentId = errors.validateObjectId(contentId)
    dateOfReview = errors.validateDateOfReview(dateOfReview)
    review = errors.validateReview(review)
    const updatedReview = await updateReview(
      reviewId,
      reviewerId,
      reviewer,
      contentId,
      dateOfReview,
      review,
      like_dislike
    )
    res.status(200).json(updatedReview)
  } catch (e) {
    return res.status(400).send(String(e))
  }
})

router.delete('/', verifyToken, async (req, res) => {
  let { contentId, reviewId } = req.body

  if (!req.userId) {
    res
      .status(400)
      .send('You must specify an ID of the user to update the review')
  }

  reviewId = errors.validateObjectId(reviewId)
  contentId = errors.validateObjectId(contentId)

  try {
    const deletedReview = await removeReview(contentId, reviewId)
    res.status(200).json(deletedReview)
  } catch (e) {
    return res.status(400).send(String(e))
  }
})

module.exports = router
