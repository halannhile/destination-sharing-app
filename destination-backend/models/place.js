const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const placeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true},
    image: { type: String, required: true },
    address: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },

    // establish connection to the User model
    creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});

// naming convention: model 'Place', collection 'places'
// require inputs: model name 'Place', schema name 'placeSchema' 
module.exports = mongoose.model('Place', placeSchema);
