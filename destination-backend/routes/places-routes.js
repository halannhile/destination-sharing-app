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

// register a route for api/places/placeId: 
router.get('/:pid', (req, res, next) => {
    const placeId = req.params.pid; // { pid: 'p1' }
    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    });
    console.log('GET request in Places');
    // send back a response with some json
    res.json({place: place}); // or can also shortern it to {place}
});

// register a route for /users/userId:
router.get('/users/:uid', (req, res, next) => {
    const userId = req.params.uid;

    const place = DUMMY_PLACES.find(p => {
        return p.creator === userId;
    });

    res.json({ place });
});

// export the router here to ue in app.js
module.exports = router;