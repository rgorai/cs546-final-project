const { ObjectId } = require('bson');
const { ReadPreferenceMode } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const movies = mongoCollections.movies;

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
/*
function arrToLowerCase(arr){
    for(let x of arr){
        x = x.toLowerCase();
    }
    return arr;
}*/

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

module.exports = {
    async create (name, releaseDate, certification, runtime, genres, description, posterPath, video, streamingPlatforms){
        if(!name) throw "Movie should have a name";
        if(!releaseDate) throw "Movie should have a release date";
        if(!certification) throw "Movie should have a certification";
        if(!runtime) throw "Movie should have a runtime";
        if(!genres) throw "Movie should have a genres";
        if(!description) throw "Movie should have a description";
        if(!posterPath) throw "Movie should have a posterPath";
        if(!video) throw "Movie should have a video link";
        if(!streamingPlatforms) throw "Movie should have streaming platforms";

        checkIsString(name);
        //checkIsString(releaseYear);
        checkIsString(certification);
        checkIsString(runtime);
        checkIsString(description);

        checkIsNumber(releaseDate);
        checkCertification(certification);
        checkIsNumber(runtime);

        checkIsArray(genres);
        checkIsArray(streamingPlatforms);

        checkIsUrl(posterPath);
        checkIsUrl(video);

        name = name.toLowerCase().trim();
        releaseDate = parseInt(releaseDate).trim();
        certification = certification.toLowerCase().trim();
        runtime = parseInt(runtime);
        genres = genres.map(genre => genre.toLowerCase());
        description = description.toLowerCase().trim();
        posterPath = posterPath.toLowerCase().trim();
        video = video.toLowerCase().trim();
        streamingPlatforms = streamingPlatforms.map(platform => platform.toLowerCase());

        const movieCollection = await movies();

        let movie = await movieCollection.findOne({name: name,
                                                    releaseDate: releaseDate});

        if(movie != null){
            throw "Movie already in the database";
        }

        let newMovie = {
            name: name,
            releaseDate: releaseDate,
            certification: certification,
            runtime: runtime,
            description: description,
            genres: genres,
            posterPath: posterPath,
            video: video,
            streamingPlatforms: streamingPlatforms,
            rating: 0,
            likes: 0,
            dislikes: 0,
            reviews: []
        };

        const insertInfo = await movieCollection.insertOne(newMovie);
        if(insertInfo.insertedCount === 0) throw "Could not add the new movie";

        const newId = insertInfo.insertedId;

        movie = await this.get(newId);
        return movie;     

    },

    async get(id){
        if(!id) throw "Must provide a movie id";

        let parsedId = getObject(id);

        const movieCollection = await movies();
        const movie = await movieCollection.findOne({_id: parsedId});

        if(movie === null){
            throw "No movie with that id";
        }

        //console.log(restaurant["_id"].toString());

        movie["_id"] = movie["_id"].toString();
        return movie;
    },

    getAll: async function(){
        if(arguments.length != 0){
            throw "getAll function accepts no arguments";
        }
        const movieCollection = await movies();

        let movieList = await movieCollection.find({}).toArray();

        for(let movie of movieList){
            movie["_id"] = movie["_id"].toString();
        }
        return movieList;
    },

    async getByGenre(genre){
        if(!genre) throw "Must provide a genre";

        checkIsString(genre);
        genre = genre.toLowerCase().trim();

        const movieCollection = await movies();


        return await movieCollection.find({genres: {$eq: genre}}).toArray();
    },

    async getByName(name){
        if(!name) throw "Must provide a movie name";

        checkIsString(name);
        name = name.toLowerCase().trim();

        const movieCollection = await movies();

        return await movieCollection.find({name: {$eq: name}}).toArray();
    }
}