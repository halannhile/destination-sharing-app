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

const getPlaceById = async (req, res, next) => {

    // extract the placeId from request
    const placeId = req.params.pid; // { pid: 'p1' }
    
    // define place here so we can use in if block later
    let place;

    try {
        // find() is a static method & should be used directly on the Place constructor
        // exec() turns this into a promise because findById doesn't return a real promise
        // findById returns a 'fake' promise where then-catch-await can still be used
        place = await Place.findById(placeId); //.exec();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find place.', 500
        );

        // stop code execution when error is caught
        return next(error);
    }

    // return 404 error if place not found
    if (!place) {
        const error = new HttpError(
            'Could not find a place for the provided id.', 404
        );
        return next(error)
    }

    // it'd be easier if we return a javascript object
    // also change from '_id' to 'id' for clean code and easy future reference
    res.json({ place: place.toObject({ getters: true }) })
    }

const getPlacesByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let places;

    try {
        // note: use find() here instead of findById() like above
        places = await Place.find({ creator: userId });
    } catch(err) {
        const error = new HttpError(
            'Fetching places failed, please try again.',
            500
        );

        return next(error);
    }

    if (!places || places.length === 0) {
            return next(
                new HttpError('Could not find places for the provided user id.', 404));
        }

    // note: use map() here because find() returns an array, which cannot be used with toObject() 
    res.json({ places: places.map(place => place.toObject({getters: true}) ) });
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


