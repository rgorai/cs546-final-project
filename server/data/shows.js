const mongoCollections = require('../config/mongoCollections')
const showCollection = mongoCollections.shows
const { ObjectId } = require('mongodb')

const create = async (
    name,
    year,
    overview,
    number_of_seasons,
    number_of_episodes,
    genres
) => {
    const shows = await showCollection()
    let newShow = {
        name : name,
        year : year,
        overview : overview,
        number_of_seasons : number_of_seasons,
        number_of_episodes : number_of_episodes,
        genres : genres,
        overallRating : 0, //initializing overallRating to be 0 when a show is created
        review : [] //initializing review as empty array
    }

    const insertRet = await shows.insertOne(newShow)
    if (insertRet.insertedCount === 0) throw 'Could not add show'
}