const { ObjectId } = require('mongodb')
const mongoCollections = require('../config/mongoCollections')

const validateLikeDislike = (like) => {
  if (typeof like !== 'number' || isNaN(Number(like)))
    throw 'Like or Dislike must be a number'
  return Number(like)
}

const validateTotalArguments = (totalFields) => {
  const TOTAL_MANDATORY_ARGUMENTS = 5

  if (totalFields !== TOTAL_MANDATORY_ARGUMENTS) {
    throw 'Error: All fields need to have valid values.'
  }
}

const validateTitle = (title) => {
  isArgumentString(title, 'title')
  isStringEmpty(title, 'title')

  return title.trim()
}

const validateReviewer = (_reviewer) => {
  isArgumentString(_reviewer, 'reviewer')
  isStringEmpty(_reviewer, 'reviewer')

  const reviewer = _reviewer.trim()

  isValidString(reviewer, 'Reviewer')

  return reviewer
}

const validateDateOfReview = (_dateOfReview) => {
  isArgumentString(_dateOfReview, 'date of review')
  isStringEmpty(_dateOfReview, 'date of review')

  const dateOfReview = _dateOfReview.trim()

  const today = new Date()

  const givenDateOfReview = new Date(dateOfReview)

  if (
    today.getFullYear() !== givenDateOfReview.getFullYear() ||
    today.getMonth() !== givenDateOfReview.getMonth() ||
    today.getDate() !== givenDateOfReview.getDate()
  ) {
    throw 'Error: Date of review should be in format MM/DD/YYYY. Date of review cannot be in past or in future.'
  }

  return dateOfReview
}

const validateReview = (review) => {
  isArgumentString(review, 'review')
  isStringEmpty(review, 'review')

  return review.trim()
}

const isArgumentString = (str, variableName) => {
  if (typeof str !== 'string') {
    throw `Error: Invalid argument passed for ${
      variableName || 'provided variable'
    }. Expected string.`
  }
}

const isStringEmpty = (str, variableName) => {
  if (!str.trim() || str.length < 1) {
    throw `Error: Empty string passed for ${
      variableName || 'provided variable'
    }.`
  }
}

const isValidString = (str, variableName) => {
  const number = parseFloat(str)

  if (!isNaN(number)) {
    throw `Error: ${variableName} cannot be number string.`
  }
}

const validateReviewId = (reviewId) => {
  isArgumentString(reviewId, 'id')
  isStringEmpty(reviewId, 'id')

  return reviewId.trim()
}

const validateObjectId = (id) => {
  //should match 24 length Hex string
  const objectIdRegex = /^[a-fA-F0-9]{24}$/

  if (!ObjectId.isValid(id) || !objectIdRegex.test(id)) {
    throw 'Error: id is not a valid ObjectId.'
  }

  return ObjectId(id)
}

module.exports = {
  validateTotalArguments,
  validateTitle,
  validateLikeDislike,
  validateReviewer,
  validateDateOfReview,
  validateReview,
  isArgumentString,
  isStringEmpty,
  validateReviewId,
  validateObjectId,
}
