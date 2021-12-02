const { ObjectId } = require('mongodb')
const mongoCollections = require('../config/mongoCollections')

const ErrorCode = {
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
}

const validateLikeDislike = (like) => {
  if (typeof likes !== boolean) throw 'Like or Dislike must be boolean'
  return like
}

const validateTotalArguments = (totalFields) => {
  const TOTAL_MANDATORY_ARGUMENTS = 5

  if (totalFields !== TOTAL_MANDATORY_ARGUMENTS) {
    throwError(
      ErrorCode.BAD_REQUEST,
      'Error: All fields need to have valid values.'
    )
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

// const validateRating = (rating) => {
//     if (typeof rating !== "number" || isNaN(rating)) {
//         throwError(ErrorCode.BAD_REQUEST, "Error: Rating must be a number.");
//     }

//     const LOWEST_RATING = 1;
//     const HIGHEST_RATING = 5;

//     if (rating < LOWEST_RATING || rating > HIGHEST_RATING) {
//         throwError(ErrorCode.BAD_REQUEST, "Error: Rating must be from 1 to 5.");
//     }
// };

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
    throwError(
      ErrorCode.BAD_REQUEST,
      'Error: Date of review should be in format MM/DD/YYYY. Date of review cannot be in past or in future.'
    )
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
    throwError(
      ErrorCode.BAD_REQUEST,
      `Error: Invalid argument passed for ${
        variableName || 'provided variable'
      }. Expected string.`
    )
  }
}

const isStringEmpty = (str, variableName) => {
  if (!str.trim() || str.length < 1) {
    throwError(
      ErrorCode.BAD_REQUEST,
      `Error: Empty string passed for ${variableName || 'provided variable'}.`
    )
  }
}

const isValidString = (str, variableName) => {
  const number = parseFloat(str)

  if (!isNaN(number)) {
    throwError(
      ErrorCode.BAD_REQUEST,
      `Error: ${variableName} cannot be number string.`
    )
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
    throwError(ErrorCode.BAD_REQUEST, 'Error: id is not a valid ObjectId.')
  }

  return ObjectId(id)
}

const throwError = (code = 404, message = 'Not found') => {
  throw { code, message }
}

const throwCatchError = (error) => {
  if (error.code && error.message) {
    throwError(error.code, error.message)
  }

  throwError(ErrorCode.INTERNAL_SERVER_ERROR, 'Error: Internal server error.')
}

module.exports = {
  ErrorCode,
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
  throwError,
  throwCatchError,
}
