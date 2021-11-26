const movieRoutes = require('./movies');
const showRoutes = require("./shows");

const constructorMethod = (app) =>{
    app.use('/movies', movieRoutes);
    app.use('/shows', showRoutes);

    app.use('*', (req, res) =>{
        res.sendStatus(404);
    });
};

module.exports = constructorMethod;