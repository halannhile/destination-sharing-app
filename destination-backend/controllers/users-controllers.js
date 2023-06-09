const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator')

const HttpError = require('../models/http-error');

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


const signup = (req, res, next) => {
    // checks on req's body: 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        throw new HttpError('Invalid inputs, please check your data.', 422);
    };

    const { name, email, password } = req.body;

    const hasUser = DUMMY_USERS.find(u => u.email === email);
    
    if (hasUser) {
        // 422: invalid user's input
        throw new HttpError('Could not create user, email already registered.', 422)
    }

    const createdUser = {
        id: uuidv4(),
        name, // same as name: name
        email, 
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser })
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
