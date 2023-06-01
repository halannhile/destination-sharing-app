const axios = require('axios');

const HttpError = require('../models/http-error');

require('dotenv').config();
const apiKey = process.env.API_KEY;

// more on async: https://academind.com/tutorials/callbacks-vs-promises-vs-rxjs-vs-async-awaits
async function getCoordsForAddress(address) {

    // solution when we have no api key: 
    // return { 
    //     lat: 40.7484474, 
    //     lng: -73.9871516
    // };

    const respons = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}
        &key=${apiKey}`
        );

    const data = response.data;
    
    // when address can't be found: 
    if (!data || data.status === 'ZERO_RESULTS') {
        const error = new HttpError('Could not find coordinates for the specified address.', 422);

        throw error;
    }

    const coordinates = data.results[0].geometry.location;

    return coordinates;
};

module.exports = getCoordsForAddress;
