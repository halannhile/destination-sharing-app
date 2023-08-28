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

// return only name and email, not password
const getUsers = async (req, res, next) => {
    let users;
    try{
        users = await User.find({}, '-password'); // can also do 'email name'
    } catch (err) {
        const error = new HttpError(
            'Fetching users failed, please try again later.',
            500
        );
        return next(error);
    };
    // need to use map() bc find() returns an array
    res.json({users: users.map(user => user.toObject({ getters: true }))});    
};


const signup = async (req, res, next) => {
    // checks on req's body: 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(
            new HttpError('Invalid inputs, please check your data.', 422)
        );
    };

    const { name, email, password } = req.body;

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
        places: []
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

const login = async (req, res, next) => {
    const { email, password } = req.body;

    // custom email validator - same as before
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email })
    } catch (err) {
        const error = new HttpError(
            'There was a problem loggin you in, please try again.',
            500
        );
        return next(error); 
    };

    // check if email and password are correct
    if (!existingUser || existingUser.password !== password) {
        const error = new HttpError(
            'Invalid email or password, could not log you in.',
            401
        );
        return next(error);
    };

    res.json({ message: 'Logged in' })
}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
