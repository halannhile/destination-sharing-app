const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },

    // using unique here will create an index for each email
    // speeding up email search when user logs in 
    email: { type: String, required: true, unique: true },
    
    password: { type: String, required: true, minlength: 6 },
    image: { type: String, required: true },
    
    // each user can have multiple places, which will be dynamic
    // we'll store the IDs allocated to a user here
    // we're using [] bc each user can have multiple (i.e. an array of) places 
    places: { type: mongoose.Types.ObjectId, required: true, ref: 'Place' }
});

// internal validation to make sure emails are unique (not done by mongoose)
// condition: only create a new user if the email doesn't exist already
userSchema.plugin(uniqueValidator);

// naming convention: model 'Place', collection 'places'
// require inputs: model name 'Place', schema name 'placeSchema' 
module.exports = mongoose.model('User', userSchema);
