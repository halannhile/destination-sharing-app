const { v4: uuidv4 } = require('uuid');

const HttpError = require('../models/http-error');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Sydney Opera House',
        description: 'An architectural icon of Sydney',
        location: {
            lat: -33.85662900846622, 
            lng: 151.21531387971248
        },
        address: 'Bennelong Point, Sydney NSW 2000, Australia',
        creator: 'u1'
    },
    {
        id: 'p2',
        title: 'Sydney Opera House 2',
        description: 'An architectural icon of Sydney',
        location: {
            lat: -33.85662900846622, 
            lng: 151.21531387971248
        },
        address: 'Bennelong Point, Sydney NSW 2000, Australia',
        creator: 'u1'
    }
];

// methods to create this function: 
// 1. function getPlaceById() { ... }
// 2. const getPlaceById = function() { ... }

const getUsers = (req, res, next) => {
    let creators = DUMMY_PLACES.map(user => user.creator);

    // return 404 error if place not found
    if (!creators) {
        throw new HttpError('No users found.', 404);
    }

    // send back a response with some json
    res.json({ creators }); // equivalent to { place: place }
}

exports.getUsers = getUsers;
