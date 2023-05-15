const express = require('express');

const router = express.Router();

// register a route: 
router.get('/', (req, res, next) => {
    console.log('GET request in Places');
    // send back a response with some json
    res.json({message: 'it works!'});
});