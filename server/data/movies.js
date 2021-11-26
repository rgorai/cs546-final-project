const mongoCollections = require('../config/mongoCollections');
const movieCollection = mongoCollections.movies;
const { ObjectId } = require('mongodb');

function checkIsString(s){
  if(typeof(s) != "string") throw "Given input is invalid";
  if(s.length < 1) throw "Given input is empty";
  if(s.trim().length === 0) throw "Given input is all white spaces";
}


function checkCertification(c){
  let certifications = ["PG", "PG-13", "R", "NC-17"];
  if(certifications.indexOf(c) < 0) throw "Given certification is invalid";
}

function checkIsNumber(r){
  r = parseInt(r);
  if(isNaN(r)) throw "Given runtime is invalid";
}

function checkIsArray(arr){
  if(!Array.isArray(arr)){
      throw "Given genres are invalid";
  }
  else if(arr.length === 0){
      throw "Given genres are empty";
  }

  for(let x of arr){
      checkIsString(x);
      x = x.trim();
  }
}

function checkIsUrl(url){
  let s;
  try{
      s = new URL(url)
  } catch(e){
      throw "Given url is invalid";
  }

}

function getObject(id){
  let {ObjectId} = require("mongodb");
  let newObjId = ObjectId();
  let x = newObjId.toString();
  if(typeof id === "object"){
      parsedId = id;
  }
  else{
      checkIsString(id);
      if(!ObjectId.isValid(id)){
          throw "Given id is invalid";
      }
      parsedId = ObjectId(id);
  }

  return parsedId;
}

const create = async (
    name, 
    releaseDate, 
    certifications, 
    runtime,
    genres,
    description,
    posterPath,
    videos,
    streamingPlatforms,
  ) => {
  // error check
  if(!name) throw "Movie should have a name";
  if(!releaseDate) throw "Movie should have a release date";
  if(!certifications) throw "Movie should have a certification";
  if(!runtime) throw "Movie should have a runtime";
  if(!genres) throw "Movie should have a genres";
  if(!description) throw "Movie should have a description";
  if(!posterPath) throw "Movie should have a posterPath";
  if(!videos) throw "Movie should have a video link";
  if(!streamingPlatforms) throw "Movie should have streaming platforms";

  checkIsString(name);
  checkIsString(certifications);
  checkIsString(runtime);
  checkIsString(description);

  checkIsNumber(releaseDate);
  checkCertification(certification);

  checkIsNumber(runtime);

  checkIsArray(genres);
  checkIsArray(streamingPlatforms);
  checkIsUrl(posterPath);
  checkIsUrl(videos);

  name = name.toLowerCase().trim();
  releaseDate = parseInt(releaseDate).trim();
  certifications = certifications.toLowerCase().trim();
  runtime = parseInt(runtime);
  genres = genres.map(genre => genre.toLowerCase());
  description = description.toLowerCase().trim();
  posterPath = posterPath.toLowerCase().trim();
  videos = videos.toLowerCase().trim();
  streamingPlatforms = streamingPlatforms.map(platform => platform.toLowerCase());

  // .results.find((e) => e.iso_3166_1 === 'US') to get MPAA rating
  // videos.results to get vids

  // add new movie to db
  const movies = await movieCollection();

  //check if the movie already in the database

  let movie = await movies.findOne({name: name,
    releaseDate: releaseDate});

    if(movie != null){
      throw "Movie already in the database";
  }

  const insertRet = await movies.insertOne({
    name: name,
    releaseDate: releaseDate,
    certifications: certifications,
    runtime: runtime,
    genres: genres,
    description: description,
    posterPath: posterPath,
    videos: videos,
    streamingPlatforms: streamingPlatforms,
    overallRating: 0,
    reviews: []
  });


  // throw if insertion failed
  if (!insertRet.acknowledged)
    throw 'Error: failed to add new movie.'

  return await get(insertRet.insertedId.toString())
}

const get = async (movieId) => {
  // error check
  if (typeof(movieId) !== 'string' || movieId.length === 0 || movieId === ' '.repeat(movieId.length))
    throw 'Error: movieId must be a non-empty string.'
  
  // convert id to object
  try {
    movieId = ObjectId(movieId)
  } catch (e) {
    throw String(e)
  }

  // find movie
  const movies = await movieCollection()
  const movie = await movies.findOne({ _id: movieId })

  if (!movie) 
    throw 'Error: failed to find movie.'

  return { ...movie, _id: movie._id.toString() }
}

const getAll = async (x) => {
  // error check
  if (typeof(x) !== 'undefined')
    throw 'Error: no parameters should be given.'

  // get and return all restaurants
  const movies = await movieCollection()
  return await movies.find({}).map((e) => ({ 
    ...e, 
    _id: e._id.toString(),
  })).toArray()
}

const getByGenre = async (str) => {
  // error check
  console.log(str);
  if(!str) throw "Must provide a genre";

  checkIsString(str);
  str = str.toLowerCase().trim();

  // get all movies of given genre

  const movies = await movieCollection()
  return await movies.find({genres: {$eq: str}}).toArray();
  
  // mongo

}

const getByName = async(str) =>{
  //console.log("in getByName");
  //console.log(str);
  if(!str) throw "Must provide a movie name";

  checkIsString(str);
  str = str.toLowerCase().trim();

  const movies = await movieCollection()

  return await movies.find({name: {$eq: str}}).toArray();
}





module.exports = {
  create,
  get,
  getAll,
  getByGenre,
  getByName
}