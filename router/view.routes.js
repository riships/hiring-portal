const express = require('express');
const router = express.Router();
const axios = require('axios');
const { authMiddleware } = require('../middleware/auth');

// Home page route
router.get('/', authMiddleware, (req, res) => {
    let userData = null;
    if (req.user) {
        userData = JSON.parse(req.user);
    }
    res.render('index', { title: 'Home', successMessage: false, name: userData ? userData.name : null });
});

// Login page route
router.get('/login', authMiddleware, (req, res) => {
    if (!req.user) {
        res.render('login', { title: 'Login', successMessage: false, name: null, });
    } else (
        res.redirect('/')
    )
});

// signup page route
router.get('/signup', authMiddleware, (req, res) => {
    if (!req.user) {
        res.render('signup', { title: 'SignUp', name: null, successMessage: false });
    } else (
        res.redirect('/')
    )
});


router.get("/postjob", authMiddleware, (req, res) => {
    let userData = null;
    if (req.user) {
        userData = JSON.parse(req.user);
    }
    if (req.user) {
        res.render("jobposting", { title: 'Post Job', name: userData ? userData.name : null, successMessage: false, job: null })
    } else {
        res.redirect("/")
    }
})


module.exports = router;
