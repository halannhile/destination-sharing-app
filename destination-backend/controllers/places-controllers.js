const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');

// import the Place constructor from the place model
const Place = require('../models/place');

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Sydney Opera House',
        description: 'An architectural icon of Sydney',
        location: {
            lat: -33.85662900846622, 
            lng: 151.21531387971248
        },
        address: 'Bennelon4g Point, Sydney NSW 2000, Australia',
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
    res.json({ place }); // equivalent to { place: place }
}

const getPlacesByUserId = (req, res, next) => {
    const userId = req.params.uid;

    const places = DUMMY_PLACES.filter(p => {
        return p.creator === userId;
    });

    if (!places || places.length === 0) {
            return next(
                new HttpError('Could not find places for the provided user id.', 404));
        }

    res.json({ places });
}

const createPlace = async (req, res, next) => {
    // checks on req's body: 
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs, please check your data.', 422));
    };
    
    // object destructuring: 
    const { title, description, address, creator } = req.body;
    
    let coordinates;

    // need to wrap in try{} if want to handle errors when working with async and await 
    try {
        coordinates = await getCoordsForAddress(address);
    } catch (error) {
        // calling return here to quit if there's an error and not run any code below this point
        return next(error);
    }

    // using the Place constructor from place model
    const createdPlace =  new Place({
        title, 
        description, 
        address,
        location: coordinates,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg',
        creator
    });
    
    // save(): a Mongoose method that helps store the new document in MongoDB and create a unique id
    // save() is an asynchronous task (i.e. returns a promise)
    try {
        await createdPlace.save();
    } catch (err) {
        const error = new HttpError(
            'Creating place failed, please try again.',
            500 // error code
        );
        return next(error); // to stop code execution in case of error
    }
    
    

    // send back a response: 201 if successfully created something new
    res.status(201).json({place: createdPlace});
};

const updatePlace = (req, res, next) => {
    // checks on req's body: 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs, please check your data.', 422);
    };

    const { title, description } = req.body;
    const placeId = req.params.pid;

    // identify the place to be updated
    const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
    const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};

const deletePlace = (req, res, next) => {
    // getting id of place we want to delete
    const placeId = req.params.pid;

    // check if place exists before delete: 
    if (!DUMMY_PLACES.find(p => p.id === placeId)) {
        throw new HttpError('Could not find a place for that id to delete.', 404);
    }

    // replace DUMMY_PLACES array with only places that are not to be deleted
    DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
    
    res.status(200).json({message: 'Deleted place.'})
}


exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;


