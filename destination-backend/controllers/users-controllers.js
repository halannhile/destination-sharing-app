const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error');

// import User model
const User = require('../models/user');

let DUMMY_USERS = [
    {
        id: 'u1',
        name: 'Nhi Le',
        email: 'nhile@gmail.com',
        password: '123'
    },
    {
        id: 'u2',
        name: 'Duc Le',
        email: 'ducle@gmail.com',
        password: '123456'
    }
];

// methods to create this function: 
// 1. function getPlaceById() { ... }
// 2. const getPlaceById = function() { ... }

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS })
};


const signup = async (req, res, next) => {
    // checks on req's body: 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs, please check your data.', 422)
        );
    };

    const { name, email, password, places } = req.body;

    // check if user email exists already
    // findOne() finds one document matching the criteria in the argument of our method
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'There was a problem signing you up, please try again.',
            500
        );
        return next(error); 
    };

    // return error if user already exists in database
    if (existingUser) {
        const error = new HttpError(
            // doing this presents the issue of exposing this info to other users
            // but we'll stick with this for now for a better user experience
            'User already exists, please login instead.',
            422
        );
        return next(error);
    };

    // if user doesn't already exist, allow signup
    // make sure it's consistent with the User schema
    const createdUser = new User({
        name, 
        email, 
        image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
        password,
        places
    });

    // saving the newly created user
    try {
        await createdUser.save();
    } catch (err) {
        const error = new HttpError(
            'There was a problem signing you up, please try again.',
            500    
        );
        return next(Error);
    };

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = DUMMY_USERS.find(u => u.email === email);
    
    if (!identifiedUser || identifiedUser.password !== password) {
        // 401: authentication failed
        throw new HttpError('Could not identify user, the provided credentials seem to be wrong.', 401) 
    }
    
    res.json({ message: 'Logged in' })
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
