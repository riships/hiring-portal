const express = require('express');
const router = express.Router();
const axios = require('axios');

// Home page route
router.get('/', (req, res) => {
    res.render('index',{ title: 'Home', name: null, });
});

// Login page route
router.get('/login', (req, res) => {
    res.render('login', { title: 'Login', name: null, });
});

// signup page route
router.get('/signup', (req, res) => {
    res.render('signup', { title: 'SignUp', name: null, });
});


module.exports = router;
