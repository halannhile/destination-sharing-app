const express = require('express');

const placesControllers = require('../controllers/places-controllers')

const router = express.Router();


// register a route for api/places/placeId: 
router.get('/:pid', placesControllers.getPlaceById);

// register a route for /users/userId:
router.get('/users/:uid', placesControllers.getPlacesByUserId);

// POST request: this will reach /api/places-routes 
router.post('/', placesControllers.createPlace)

// PATCH request: update place by id: 
router.patch('/:pid', placesControllers.updatePlace)

// DELETE request: delete place by id: 
router.delete('/:pid', placesControllers.deletePlace)

// export the router here to ue in app.js
module.exports = router;