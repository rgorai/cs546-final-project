const mongoCollections = require('../config/mongoCollections')
const userCollection = mongoCollections.users
const { ObjectId } = require('mongodb')

const create = async (
    firstName, 
    lastName, 
    email,
    username,
    password
  ) => {
  // error check

  // add new user to db
  const users = await userCollection()
  const insertRet = await users.insertOne({
    firstName: firstName,
    lastName: lastName,
    email: email,
    username: username,
    password: password
  })

  // throw if insertion failed
  if (!insertRet.acknowledged)
    throw 'Error: failed to add new user.'

  return await get(insertRet.insertedId.toString())
}

const checkUser = async (username, password) => {
  // error check


  // get user
  const users = await userCollection()
  const user = users.findOne({
    username: username
  })

  if (!user || user.password !== password)
    throw 'Invalid username or password.'

  return { 
    authenticated: true,
    token: token
  }
}

const get = async (userId) => {
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
  create,
  get,
}