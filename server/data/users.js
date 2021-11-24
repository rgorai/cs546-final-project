const mongoCollections = require('../config/mongoCollections')
const userCollection = mongoCollections.users
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/authConfig')

const createUser = async (
    firstName, 
    lastName, 
    email,
    username,
    password
  ) => {
  // error check


  // check if email exists
  const users = await userCollection()
  if (await users.findOne({ email: email }))
    throw 'Email address is taken.'

  // check if username exists
  if (await users.findOne({ username: username }))
    throw 'Username is taken.'

  // add new user to db
  const insertRet = await users.insertOne({
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: bcrypt.hashSync(password, 8)
  })

  // throw if insertion failed
  if (!insertRet.acknowledged)
    throw 'Failed to add new user.'

  return { userInserted: true }
}

const authenticateUser = async (username, password) => {
  // error check


  // get user
  const users = await userCollection()
  const user = await users.findOne({ username: username })

  // authenticate user
  if (!user || !bcrypt.compareSync(password, user.password))
    return { authenticated: false }

  return { 
    authenticated: true,
    userId: user._id,
    token: jwt.sign(
      { id: user._id.toString() }, 
      config.secret, 
      { /* expiresIn: 86400 */ })
  }
}

const getUser = async (userId) => {
  // error check
  if (typeof(userId) !== 'string' || userId.length === 0 || userId === ' '.repeat(userId.length))
    throw 'Error: userId must be a non-empty string.'
  
  // convert id to object
  try {
    userId = ObjectId(userId)
  } catch (e) {
    throw String(e)
  }

  // find restaurant
  const users = await userCollection()
  const user = await users.findOne({ _id: userId })

  if (!user) 
    throw 'Error: failed to find user.'

  return { 
    ...user, 
    _id: user._id.toString(),
    // reviews: restaurant.reviews.map((e) => (
    //   { ...e, _id: e._id.toString() }
    // ))
  }
}

module.exports = {
  createUser,
  authenticateUser,
  getUser,
}