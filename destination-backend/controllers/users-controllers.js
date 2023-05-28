const { v4: uuidv4 } = require('uuid');

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
    const { name, email, password } = req.body;

    const createdUser = {
        id: uuidv4(),
        name, // same as name: name
        email, 
        password
    };

    DUMMY_USERS.push(createdUser);

    res.status(201).json({ user: createdUser })
}

const login = (req, res, next) => {

}

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
