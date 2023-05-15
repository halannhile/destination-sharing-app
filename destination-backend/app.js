const express = require('express');
const bodyParser = require('body-parser');

// import this route to use as a middleware
const placesRoutes = require('./routes/places-routes');

const app = express();

app.use(placesRoutes);

app.listen(5000)

