const HttpError = require('../models/http-error');

const DUMMY_PLACES = [
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
    }
];

// methods to create this function: 
// 1. function getPlaceById() { ... }
// 2. const getPlaceById = function() { ... }

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid; // { pid: 'p1' }
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });

    // return 404 error if place not found
    if (!place) {
        throw new HttpError('Could not find a place for the provided id.', 404);
    }

    // send back a response with some json
    res.json({place: place}); // or can also shortern it to {place}
}

const getPlaceByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    if (!place) {
            return next(new HttpError('Could not find a place for the provided user id.', 404));
        }

    res.json({ place });
}

const createPlace = (req, res, next) => {
    // object destructuring: 
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        title, // shortcut for title: title
        description, 
        location: coordinates,
        address,
        creator
    };

    // add to dummy_places: 
    DUMMY_PLACES.push(createPlace) // or unshift(createdPlace) if we want createdPlace to be first element

    // send back a response: 201 if successfully created something new
    res.status(201).json({place: createPlace});
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;

