const express = require('express'); // can also do const { Router } = require('express') to only import Router
const { check } = require('express-validator')

const placesControllers = require('../controllers/places-controllers')

const router = express.Router();


// register a route for api/places/placeId: 
router.get('/:pid', placesControllers.getPlaceById);

// register a route for /users/userId:
router.get('/users/:uid', placesControllers.getPlacesByUserId);

// POST request: this will reach /api/places 
router.post('/', 
    [
        check('title')
        .not()
        .isEmpty(),

        check ('description')
        .isLength({min: 5}),

        check('address')
        .not()
        .isEmpty()
    ], 
    placesControllers.createPlace)

// PATCH request: update place by id: 
router.patch('/:pid', 
    [
        check('title')
        .not()
        .isEmpty(),

        check ('description')
        .isLength({ min: 5 })
    ],
    placesControllers.updatePlace)

// DELETE request: delete place by id: 
router.delete('/:pid', placesControllers.deletePlace)

// export the router here to ue in app.js
module.exports = router;