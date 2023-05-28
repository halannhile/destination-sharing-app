const express = require('express');
const bodyParser = require('body-parser');

// import this route to use as a middleware
const placesRoutes = require('./routes/places-routes');
const HttpError = require('./models/http-error');

const app = express();

// this will parse any incoming req's body
// extract any json in there, convert into regular javascript data structures (e.g. objects, arrays)
// and call next automatically so it reaches the next middleware placesRoutes
// also adding this json data there
app.use(bodyParser.json());

// will only forward requests to the placesRoutes middleware (in places-routes.js) if their path starts with /api/places
app.use('/api/places', placesRoutes);

// app.use((req, res, next) => {
//     const error = new HttpError('Could not find this route', 404);
//     throw error
// });

// middleware for error handling
// will only execute on request with an error
// i.e. only execute when any middleware prior to it yields an error
app.use((error, req, res, next) => {
    // if a response has been sent
    if (res.headerSent) {
        return next(error)
    }
    res.status(error.code || 500);
    res.json({message: error.message || 'An unknown error occured.'})
})

app.listen(5000)

