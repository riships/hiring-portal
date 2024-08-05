const express = require('express');
const router = express.Router();

router.route('/data')
    .get((req, res) => {
        res.send('Hello World!');
    });

module.exports = { router }