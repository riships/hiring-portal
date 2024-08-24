const express = require('express');
const { userLogin, userSignup } = require('../controller/user.controller');
const router = express.Router();

// Login api
router.post('/login', userLogin);

// Signup api
router.post('/signup', userSignup);

// for job listing
router.get("/jobs", alljobs)

module.exports = router;
