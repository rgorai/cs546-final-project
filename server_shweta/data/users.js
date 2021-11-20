const { ObjectId } = require('bson');
const { ReadPreferenceMode } = require('mongodb');
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const bcrypt = require('bcrypt');
const saltRounds = 16;

function checkIsString(s){
    if(typeof(s) != "string") throw "Given input is invalid";
    if(s.length < 1) throw "Given input is empty";
    if(s.trim().length === 0) throw "Given input is all white spaces";
    if(s.indexOf(" ") >= 0) throw "Given input has spaces"
}

function checkIsName(s){
    if(/[^a-zA-Z]/.test(s)) throw "Given input is not only letters";
    if(s.length < 4) throw "Given name size is less than 4";       
}

function checkIsPassword(s){
    if(s.length < 8) throw "Given password size is less than 8";
}

function checkIsEmail(s){
    if(s.indexOf("@") < 0) throw "Given email id is invalid";

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
    async createUser(firstName, lastName, email, password){
        if(!firstName) throw "You must provide the first name";
        if(!lastName) throw "You must provide the last name";
        if(!email) throw "You must provide an email address";
        if(!password) throw "You must provide a password";
        
        checkIsString(firstName);
        checkIsString(lastName);
        checkIsString(email);
        checkIsString(password);

        checkIsName(firstName);
        checkIsName(lastName);

        checkIsPassword(password);
        checkIsEmail(email);

        firstName = firstName.toLowerCase();
        lastName = lastName.toLowerCase();
        email = email.toLowerCase();

        const userCollection = await users();
        let user = await userCollection.findOne({email: email});

        if(user != null){
            throw "User already in the database";
        }

        const hash = await bcrypt.hash(password, saltRounds);

        let newUser = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            reviews: [],
            watchlist: []

        };

        const insertInfo = await userCollection.insertOne(newUser);
        if(insertInfo.insertedCount === 0) throw "Could not add the new user";

        user = await this.getByEmail(email);
        return user;          


    },

    async checkUser(email, password){
        if(!email) throw "You must provide an email address";
        if(!password) throw "You must provide a password";

        checkIsString(email);
        checkIsString(password);

        checkIsPassword(password);
        checkIsEmail(email);

        const userCollection = await users();
        const user = await userCollection.findOne({email: email});

        if(user === null){
            throw "Either the username or password is invalid";
        }

        let foundMatch = false;
        

        try{
            foundMatch = await bcrypt.compare(password, user["password"]);
        } catch(e){
            throw e;
        }

        if(foundMatch === true){
            return {authenticated: true};
        }
        else{
            throw "Either the username or password is invalid";
        }

    },

    async getByEmail(email){
        if(!email) throw "You must provide an email address";

        checkIsString(email);
        checkIsEmail(email);

        const userCollection = await users();
        const user = await userCollection.findOne({email: email});

        if(user === null){
            throw "Either the email or password is incorrect";
        }

        user["_id"] = user["_id"].toString();
        return user;
    },

    async getById(id){
        if(!id) throw "You must provide an Id";
        let parsedId = getObject(id);

        const userCollection = await users();
        const user = await userCollection.findOne({_id: parsedId});

        if(user === null){
            throw "Either the email or password is incorrect";
        }

        user["_id"] = user["_id"].toString();
        return user;

    },

    async updatePassword(id, password){
        if(!id) throw "You must provide an Id";
        if(!password) throw "You must provide a password";

        checkIsPassword(password);

        let parsedId = getObject(id);

        const hash = await bcrypt.hash(password, saltRounds);

        let updatedUser = {
            password: hash
        };

        const userCollection = await users();

        const updatedInfo = await userCollection.updateOne(
            {_id: parsedId},
            {$set: updatedUser}
        );

        if(updatedInfo.modifiedCount === 0){
            throw "Could not update user successfully";
        }

        return await this.getById(id);

    }
}