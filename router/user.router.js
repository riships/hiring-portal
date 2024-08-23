const express = require('express');
const { userLogin, userLoginNew, homePage } = require('../controller/user.controller');
const router = express.Router();

router.route('/login')
    .post(userLogin)
    .get(userLoginNew);
router.route('/')
    .get(homePage);

module.exports = { router }