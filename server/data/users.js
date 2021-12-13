const mongoCollections = require('../config/mongoCollections')
const userCollection = mongoCollections.users
const movieCollection = mongoCollections.movies
const showCollection = mongoCollections.shows
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/authConfig')
const e = require('express')

const saltRounds = 8

function checkIsString(s) {
  if (typeof s !== 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
}

function checkIsName(s) {
  if (/[^a-zA-Z]/.test(s)) throw 'Given input is not only letters'
}

function checkIsPassword(s) {
  if (s.length < 8) throw 'Given password size is less than 8'
}

function checkIsEmail(s) {
  if (!/^\S+@[a-zA-Z]+\.[a-zA-Z]+$/.test(s)) throw 'Given email id is invalid'
}

function checkIsUsername(s) {
  if (s.length < 4) throw 'Given username size is less than 4'
}

const create = async (firstName, lastName, email, username, password) => {
  // error check
  if (!firstName) throw 'You must provide the first name'
  if (!lastName) throw 'You must provide the last name'
  if (!email) throw 'You must provide an email address'
  if (!username) throw 'You must provide a username'
  if (!password) throw 'You must provide a password'

  firstName = firstName.toLowerCase().trim()
  lastName = lastName.toLowerCase().trim()
  email = email.toLowerCase().trim()
  username = username.toLowerCase().trim()
  password = password.trim()

  try {
    checkIsString(firstName)
    checkIsString(lastName)
    checkIsString(email)
    checkIsString(username)
    checkIsString(password)

    checkIsName(firstName)
    checkIsName(lastName)

    checkIsUsername(username)

    checkIsPassword(password)
    checkIsEmail(email)
  } catch (e) {
    throw String(e)
  }

  // check if email exists
  const users = await userCollection()
  if (await users.findOne({ email: email })) throw 'Email address is taken.'

  // check if username exists
  if (await users.findOne({ username: username })) throw 'Username is taken.'

  // add new user to db
  const insertRet = await users.insertOne({
    firstName,
    lastName,
    email,
    username,
    password: bcrypt.hashSync(password, saltRounds),
    watchlist: [],
    reviews: [],
  })

  // throw if insertion failed
  if (!insertRet.acknowledged) throw 'Failed to add new user.'

  return insertRet.insertedId.toString()
}

const authenticateUser = async (username, password) => {
  // error check
  if (!username) throw 'You must provide a username'
  if (!password) throw 'You must provide a password'

  username = username.toLowerCase().trim()

  try {
    checkIsString(username)
    checkIsString(password)
    checkIsUsername(username)
    checkIsPassword(password)
  } catch (e) {
    throw String(e)
  }

  // get user by username or email
  const users = await userCollection()
  let user = await users.findOne({ username: username })
  if (!user) user = await users.findOne({ email: username })

  // authenticate user
  if (!user || !bcrypt.compareSync(password, user.password))
    return { authenticated: false }

  return {
    authenticated: true,
    userId: user._id,
    username: username,
    access_token: jwt.sign({ id: user._id.toString() }, config.secret, {
      /* expiresIn: 86400 */
    }),
  }
}

const getUser = async (userId) => {
  // error check
  if (
    typeof userId !== 'string' ||
    userId.length === 0 ||
    userId === ' '.repeat(userId.length)
  )
    throw 'Error: userId must be a non-empty string.'

  // convert id to object
  try {
    userId = ObjectId(userId)
  } catch (e) {
    throw String(e)
  }

  // find user
  const users = await userCollection()
  const user = await users.findOne({ _id: userId })

  if (!user) throw 'Error: failed to find user.'

  return { ...user, _id: user._id.toString() }
}

const getByEmail = async (email) => {
  //error checking
  if (!email) throw 'You must provide an email address'

  email = email.toLowercase().trim()

  try {
    checkIsString(email)
    checkIsEmail(email)
  } catch (e) {
    throw String(e)
  }

  const users = await userCollection()

  //get the user
  const user = await users.findOne({ email: email })

  if (user === null) {
    throw 'Either the email or password is incorrect'
  }

  user['_id'] = user['_id'].toString()
  return user
}

const addToWatchlist = async (userId, itemId) => {
  //error checking
  if (!userId) throw 'Must provide the user id'
  if (!itemId) throw 'Must provide id of the item to be added'

  try {
    userId = ObjectId(userId)
    itemId = ObjectId(itemId)
  } catch (e) {
    throw String(e)
  }

  const users = await userCollection()
  const movies = await movieCollection()
  const shows = await showCollection()

  let user = await users.findOne({ _id: userId })
  let item = await movies.findOne({ _id: itemId })

  if (item === null) {
    item = await shows.findOne({ _id: itemId })
  }

  if (!item) throw 'Content not found'

  watchlist = user.watchlist
  for (let x of watchlist) {
    if (ObjectId(x._id).toString() === ObjectId(item._id).toString()) {
      throw 'item already in the watchlist'
    }
  }
  watchlist.push(item)

  let updatedUser = {
    watchlist: watchlist,
  }

  //add the item to the watchlist
  const updatedInfo = await users.updateOne(
    { _id: userId },
    { $set: updatedUser }
  )

  if (updatedInfo.updatedCount === 0) throw 'Could not update the watchList'

  return { addedToWatchlist: true }
}

const deleteFromWatchlist = async (userId, itemId) => {
  //error checking

  if (!userId) throw 'Must provide the user id'
  if (!itemId) throw 'Must provide id of the item to be deleted'

  try {
    userId = ObjectId(userId)
    itemId = ObjectId(itemId)
  } catch (e) {
    throw String(e)
  }

  const users = await userCollection()
  const movies = await movieCollection()
  const shows = await showCollection()

  let user = await users.findOne({ _id: userId })
  let item = await movies.findOne({ _id: itemId })

  if (item === null) {
    item = await shows.findOne({ _id: itemId })
  }

  if (!item) throw 'Content not found'

  watchlist = user.watchlist
  const newList = watchlist.filter((e) => String(e._id) !== String(itemId))

  if (watchlist.length === newList.length)
    throw 'Could not remove from watchlist'

  let updatedUser = {
    watchlist: newList,
  }

  //add the item to the watchlist
  const updatedInfo = await users.updateOne(
    { _id: userId },
    { $set: updatedUser }
  )

  if (updatedInfo.updatedCount === 0) throw 'Could not update the watchList'

  return { removedFromWatchlist: true }
}

const updatePassword = async (id, password) => {
  if (!id) throw 'You must provide an Id'
  if (!password) throw 'You must provide a password'

  try {
    checkIsPassword(password)
    id = ObjectId(id)
  } catch (e) {
    throw String(e)
  }

  const hash = await bcrypt.hash(password, saltRounds)

  let updatedUser = {
    password: hash,
  }

  const users = await userCollection()

  const updatedInfo = await users.updateOne({ _id: id }, { $set: updatedUser })

  if (updatedInfo.modifiedCount === 0) {
    throw 'Could not update user successfully'
  }

  return true
}

const updateUser = async (
  id,
  firstName,
  lastName,
  email,
  username,
  password
) => {
  if (!firstName) throw 'Must provide the first name'
  if (!lastName) throw 'Must provide the last name'
  if (!email) throw 'Must provide the email'
  if (!username) throw 'Must provide the username'
  if (!password) throw 'Must provide the password'

  firstName = firstName.trim()
  lastName = lastName.trim()
  email = email.toLowerCase().trim()
  username = username.toLowerCase().trim()
  password = password.trim()

  try {
    checkIsString(firstName)
    checkIsString(lastName)
    checkIsString(email)
    checkIsString(username)
    checkIsString(password)

    checkIsName(firstName)
    checkIsName(lastName)
    checkIsEmail(email)
    checkIsUsername(username)
    checkIsPassword(password)

    id = ObjectId(id)
  } catch (e) {
    throw String(e)
  }

  const users = await userCollection()

  // check if email exists
  if (await users.findOne({ email: email })) throw 'Email address is taken.'

  // check if username exists
  if (await users.findOne({ username: username })) throw 'Username is taken.'

  const hash = await bcrypt.hash(password, saltRounds)

  let updatedUser = {
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: hash,
  }

  const updatedInfo = await users.updateOne({ _id: id }, { $set: updatedUser })

  if (updatedInfo.modifiedCount === 0) {
    throw 'Could not update user successfully'
  }

  return updatedInfo
}

module.exports = {
  create,
  authenticateUser,
  getUser,
  getByEmail,
  updatePassword,
  addToWatchlist,
  deleteFromWatchlist,
  updateUser,
}
