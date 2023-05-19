const express = require('express');

const placesControllers = require('../controllers/places-controller')

const router = express.Router();


// register a route for api/places/placeId: 
router.get('/:pid', placesControllers.getPlaceById);

// register a route for /users/userId:
router.get('/user/:uid', placesControllers.getPlaceByUserId);

// export the router here to ue in app.js
module.exports = router;