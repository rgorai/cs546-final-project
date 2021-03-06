const connection = require('./mongoConnection')

/* This will allow you to have one reference to each collection per app */
/* Feel free to copy and paste this this */
const getCollectionFn = (collection) => {
  let _col = undefined

  return async () => {
    if (!_col) {
      const db = await connection.connectToDb()
      _col = await db.collection(collection)
    }

    return _col
  }
}

/* Now, you can list your collections here: */
module.exports = {
  movies: getCollectionFn('movies'),
  shows: getCollectionFn('shows'),
  users: getCollectionFn('users'),
  reviews: getCollectionFn('reviews'),
  mediaRequest: getCollectionFn('mediaRequest'),
}
