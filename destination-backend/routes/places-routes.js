const express = require('express');

const router = express.Router();

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

// register a route: 
router.get('/:placeId', (req, res, next) => {
    console.log('GET request in Places');
    // send back a response with some json
    res.json({message: 'it works!'});
});

// export the router here to ue in app.js
module.exports = router;