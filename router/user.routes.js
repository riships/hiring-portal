const express = require('express');
const { userLogin, userLoginView, homePage } = require('../controller/user.controller');
const router = express.Router();

router.route('/login')
    .post(userLogin)
    .get(userLoginView);
router.route('/')
    .get(homePage);

module.exports = { router }