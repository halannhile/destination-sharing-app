const express = require('express');

const router = express.Router();


// register a route for api/places/placeId: 
router.get('/:pid', (req, res, next) => {
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
});

// register a route for /users/userId:
router.get('/user/:uid', );

// export the router here to ue in app.js
module.exports = router;