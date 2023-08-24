const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

// import this route to use as a middleware
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

const app = express();

// this will parse any incoming req's body
// extract any json in there, convert into regular javascript data structures (e.g. objects, arrays)
// and call next automatically so it reaches the next middleware placesRoutes
// also adding this json data there
app.use(bodyParser.json());

// will only forward requests to the placesRoutes middleware (in places-routes.js) if their path starts with /api/places
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

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

// step 1: establish connection to database
// step 2: if connection successful, start backend server and run app
// else throw error

// note: connect returns a promise as connection is an asynchronous task
// hence we can use then() and catch()
mongoose
    .connect('mongodb+srv://nhile:risRVJ7hAALPYhyh@cluster0.asy4kev.mongodb.net/places?retryWrites=true&w=majority')
    .then(() => {
        app.listen(5000)
    })
    .catch(error => {
        console.log(err);
    });




