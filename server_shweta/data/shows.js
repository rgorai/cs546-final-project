const { ObjectId } = require('bson');
const { parse } = require('handlebars');
const { ReadPreferenceMode } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const shows = mongoCollections.shows;

function checkIsString(s){
    if(typeof(s) != "string") throw "Given input is invalid";
    if(s.length < 1) throw "Given input is empty";
    if(s.trim().length === 0) throw "Given input is all white spaces";
}


function checkIsNumber(r){
    r = parseInt(r);
    if(isNaN(r)) throw "Given runtime is invalid";
}

function checkIsArray(arr){
    if(!Array.isArray(arr)){
        throw "Given genres/ services are invalid";
    }
    else if(arr.length === 0){
        throw "Given genres/services are empty";
    }

    for(let x of arr){
        checkIsString(x);
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


module.exports = {
    async create (name, releaseDate, description, number_of_seasons, number_of_episodes, genres, posterPath, streamingPlatforms){
        if(!name) throw "Show should have a name";
        if(!releaseDate) throw "Show should have a release date";
        if(!number_of_seasons) throw "Show should have the number of seasons";
        if(!number_of_episodes) throw "Show should have the number of episodes";
        if(!genres) throw "Show should have genres";
        if(!description) throw "Show should have a description";
        if(!posterPath) throw "Show should have a posterPath";
        if(!streamingPlatforms) throw "Show should have streaming platforms";

        checkIsString(name);
        checkIsString(description);

        checkIsNumber(releaseDate);
        checkIsNumber(number_of_episodes);
        checkIsNumber(number_of_seasons);

        checkIsArray(genres);
        checkIsArray(streamingPlatforms);

        checkIsUrl(posterPath);

        name = name.toLowerCase();
        releaseDate = parseInt(releaseDate);
        description = description.toLowerCase();
        number_of_seasons = parseInt(number_of_seasons);
        number_of_episodes = parseInt(number_of_episodes);
        genres = genres.map(genre => genre.toLowerCase());       
        posterPath = posterPath.toLowerCase();
        streamingPlatforms = streamingPlatforms.map(platform => platform.toLowerCase());

        const showCollection = await shows();

        let show = await showCollection.findOne({name: name,
                                                    releaseDate: releaseDate});

        if(show != null){
            throw "The show already in the database";
        }

        let newShow = {
            name: name,
            releaseDate: releaseDate,
            description: description,
            number_of_episodes: number_of_episodes,
            number_of_seasons: number_of_seasons,       
            genres: genres,
            posterPath: posterPath,
            streamingPlatforms: streamingPlatforms,
            rating: 0,
            likes: 0,
            dislikes: 0,
            reviews: []
        };

        const insertInfo = await showCollection.insertOne(newShow);
        if(insertInfo.insertedCount === 0) throw "Could not add the new show";

        const newId = insertInfo.insertedId;

        show = await this.get(newId);
        return show;     

    },

    async get(id){
        if(!id) throw "Must provide a show id";

        let parsedId = getObject(id);

        const showCollection = await shows();
        const show = await showCollection.findOne({_id: parsedId});

        if(show === null){
            throw "No movie with that id";
        }


        show["_id"] = show["_id"].toString();
        return show;
    },

    getAll: async function(){
        if(arguments.length != 0){
            throw "getAll function accepts no arguments";
        }
        const showCollection = await shows();

        let showList = await showCollection.find({}).toArray();

        for(let show of showList){
            show["_id"] = show["_id"].toString();
        }
        return showList;
    },

    async getByGenre(genre){
        if(!genre) throw "Must provide a genre";

        checkIsString(genre);
        genre = genre.toLowerCase();

        const showCollection = await shows();


        return await showCollection.find({genres: {$eq: genre}}).toArray();
    },

    async getByName(name){
        if(!name) throw "Must provide a tv show name";

        checkIsString(name);
        name = name.toLowerCase().trim();

        const showCollection = await shows();

        return await showCollection.find({name: {$eq: name}}).toArray();
    }
}
