const express = require('express');
const { userLogin, userSignup } = require('../controller/user.controller');
const { logOut } = require('../middleware/logout');
const router = express.Router();

// Login api
router.post('/login', userLogin);

// Signup api
router.post('/signup', userSignup);

// logout api

router.get("/logout", logOut)

module.exports = router;
