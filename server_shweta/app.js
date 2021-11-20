
const shows = require("./data/shows");
const connection = require("./config/mongoConnection");
const { rename } = require("./data/shows");

async function main(){
 
    try{
       const t1 = await shows.create("Seinfeld", "1989", "Events of Jerry Seinfeld", "7", "84", ["Comedy", "Feel-Good"], "https://www.shutterstock.com/image-photo/san-francisco-california-united-states-june-1459316807", ["Netflix", "Youtube TV"]);
       console.log(t1);
    } catch(e){
        console.log(e);
    }
    

    try{
        const t2 = await shows.getByGenre("horror");
        console.log(t2);
     } catch(e){
         console.log(e);
     }

     
     
}


main().catch(e=>console.log("main error: " + e));

/*
const express = require('express');
const app = express();
const session = require('express-session');

const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

const { engine } = require('express-handlebars');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// app.engine('handlebars', exphbs({
//    defaultLayout: 'main',
//    extname: ".handlebars" }));
// app.set('view engine', 'handlebars');

app.engine('handlebars', engine({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use


app.use(
  session({
    name: 'AuthCookie',
    secret: "This is a secret.. shhh don't tell anyone",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 60000 }
  })
);

app.use('/private', (req, res, next) => {
  console.log("in the middle");
  //console.log(req.session.id);
  console.log(new Date().toUTCString());
  console.log(req.method);
  console.log(req.originalUrl);
  if (!req.session.user) {
    console.log("Non-Authenticated User");
    return res.redirect('/');
  } else {
    console.log("Authenticated User");
    next();
  }
});

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});

*/