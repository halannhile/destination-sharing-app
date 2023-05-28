const express = require('express');

const usersControllers = require('../controllers/users-controllers')

const router = express.Router();

// register a route for api/users: 
router.get('/', usersControllers.getUsers);

// POST route for sign up: 
router.post('/signup', usersControllers.signup);

// POST route for log in: 
router.post('/login', usersControllers.login);

// export the router here to ue in app.js
module.exports = router;