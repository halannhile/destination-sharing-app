const express = require('express');
const bodyParser = require('body-parser');

// import this route to use as a middleware
const placesRoutes = require('./routes/places-routes');

const app = express();

// will only forward requests to the placesRoutes middleware (in places-routes.js) if their path starts with /api/places
app.use('/api/places', placesRoutes);

app.listen(5000)

