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
    if (req.lastVisitDate) {
        lastActiveDate = req.lastVisitDate
    }
    res.render('index', { titileActiveDate: [{ title: "Home", lastVisited: lastActiveDate }], successMessage: false, name: userData ? userData.name : null });
});

// Login page route
router.get('/login', authMiddleware, (req, res) => {
    if (req.lastVisitDate) {
        lastActiveDate = req.lastVisitDate
    }
    if (!req.user) {
        res.render('login', { 
            titileActiveDate: [{ title: "Login", lastVisited: lastActiveDate }], 
            successMessage: false, 
            name: null
        });
    } else (
        res.redirect('/')
    )
});

// signup page route
router.get('/signup', authMiddleware, (req, res) => {
    if (req.lastVisitDate) {
        lastActiveDate = req.lastVisitDate
    }
    if (!req.user) {
        res.render('signup', { 
            titileActiveDate: [{ title: "Sign up", lastVisited: lastActiveDate }],
            name: null, 
            successMessage: false 
        });
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
        res.render("jobposting", {
            titileActiveDate: [{ title: "Post Job", lastVisited: lastActiveDate }], 
            name: userData ? userData.name : null,
             successMessage: false, 
             job: null 
            })
    } else {
        res.redirect("/")
    }
})




module.exports = router;
