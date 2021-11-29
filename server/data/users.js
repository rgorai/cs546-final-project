const mongoCollections = require('../config/mongoCollections')
const userCollection = mongoCollections.users
const { ObjectId } = require('mongodb')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/authConfig')

function checkIsString(s) {
  if (typeof s != 'string') throw 'Given input is invalid'
  if (s.length < 1) throw 'Given input is empty'
  if (s.trim().length === 0) throw 'Given input is all white spaces'
  if (s.indexOf(' ') >= 0) throw 'Given input has spaces'
}

function checkIsName(s) {
  if (/[^a-zA-Z]/.test(s)) throw 'Given input is not only letters'
  if (s.length < 4) throw 'Given name size is less than 4'
}

function checkIsPassword(s) {
  if (s.length < 8) throw 'Given password size is less than 8'
}

function checkIsEmail(s) {
  if (s.indexOf('@') < 0) throw 'Given email id is invalid'
}

function checkIsUsername(s) {
  if (s.length < 4) throw 'Given username size is less than 4'
}

function getObject(id) {
  let { ObjectId } = require('mongodb')
  let newObjId = ObjectId()
  let x = newObjId.toString()
  if (typeof id === 'object') {
    parsedId = id
  } else {
    checkIsString(id)
    if (!ObjectId.isValid(id)) {
      throw 'Given id is invalid'
    }
    parsedId = ObjectId(id)
  }

  return parsedId
}

const createUser = async (firstName, lastName, email, username, password) => {
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
  password = password.toLowerCase().trim()

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
    password: bcrypt.hashSync(password, 8),
    watchlist: [],
  })

  // throw if insertion failed
  if (!insertRet.acknowledged) throw 'Failed to add new user.'

  return { userInserted: true }
}

const authenticateUser = async (username, password) => {
  // error check

  if (!username) throw 'You must provide a username'
  if (!password) throw 'You must provide a password'

  username = username.toLowercase().trim()
  password = password.toLowercase().trim()

  checkIsString(username)
  checkIsString(password)

  checkIsUsername(username)
  checkIsPassword(password)

  // get user
  const users = await userCollection()
  const user = await users.findOne({ username: username })

  // authenticate user
  if (!user || !bcrypt.compareSync(password, user.password))
    return { authenticated: false }

  return {
    authenticated: true,
    userId: user._id,
    access_token: jwt.sign({ id: user._id.toString() }, config.secret, {
      /* expiresIn: 86400 */
    }),
  }
}

const getUser = async (userId) => {
  // error check
  if (!userId) throw 'Must provide a valid user id'
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

  return {
    ...user,
    _id: user._id.toString(),
    // reviews: restaurant.reviews.map((e) => (
    //   { ...e, _id: e._id.toString() }
    // ))
  }
}

const getByEmail = async (email) => {
  if (!email) throw 'You must provide an email address'

  email = email.toLowercase().trim()

  checkIsString(email)
  checkIsEmail(email)

  const users = await userCollection()

  const user = await users.findOne({ email: email })

  if (user === null) {
    throw 'Either the email or password is incorrect'
  }

  user['_id'] = user['_id'].toString()
  return user
}

const updatePassword = async (id, password) => {
  if (!id) throw 'You must provide an Id'
  if (!password) throw 'You must provide a password'

  checkIsPassword(password)

  let parsedId = getObject(id)

  const hash = await bcrypt.hash(password, saltRounds)

  let updatedUser = {
    password: hash,
  }

  const users = await userCollection()

  const updatedInfo = await users.updateOne(
    { _id: parsedId },
    { $set: updatedUser }
  )

  if (updatedInfo.modifiedCount === 0) {
    throw 'Could not update user successfully'
  }

  return await this.getById(id)
}

const addToWatchlist = async (id, str) => {
  if (!str) throw 'Must provide a movie name to add to the watchlist'
  checkIsString(str)

  str = str.toLowerCase().trim()

  const users = await userCollection()
  let user = await getUser(id)

  watchlist = user.watchlist
  parsedId = getObject(id)

  // if(watchlist.included(str)){
  //   throw "item already in the watchlist"
  // }

  for (let x of watchlist) {
    if (x === str) {
      throw 'item already in the watchlist'
    }
  }

  watchlist.push(str)

  let updatedUser = {
    watchlist: watchlist,
  }

  const updatedInfo = await users.updateOne(
    { _id: parsedId },
    { $set: updatedUser }
  )

  if (updatedInfo.updatedCount === 0) throw 'Could not update the watchList'

  return user
}

const deleteFromWatchlist = async (id, str) => {
  if (!str) throw 'Must provide a movie name to add to the watchlist'
  checkIsString(str)

  str = str.toLowerCase().trim()

  const users = await userCollection()
  let user = await getUser(id)

  watchlist = user.watchlist

  // let index = watchlist.indexOf(str)

  // delete watchlist[index]

  //console.log(updatedWatchlist);

  updatedWatchlist = watchlist.filter(function (item) {
    return item !== str
  })

  console.log(updatedWatchlist)

  let updatedUser = {
    watchlist: updatedWatchlist,
  }

  const updatedInfo = await users.updateOne(
    { _id: parsedId },
    { $set: updatedUser }
  )

  if (updatedInfo.updatedCount === 0) throw 'Could not update the watchList'

  return user
}

module.exports = {
  createUser,
  authenticateUser,
  getUser,
  getByEmail,
  updatePassword,
  addToWatchlist,
  deleteFromWatchlist,
}
