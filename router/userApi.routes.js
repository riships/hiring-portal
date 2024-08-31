const express = require('express');
const { userLogin, userSignup,userlogOut } = require('../controller/user.controller');
const router = express.Router();

// Login api
router.post('/login', userLogin);

// Signup api
router.post('/signup', userSignup);

// logout api
router.get("/logout", userlogOut)

module.exports = router;
