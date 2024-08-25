const { getJobs } = require('../controller/jobs.controller');
const express = require('express');
const router = express.Router();

// Define your route for getting jobs
router.get('/jobs', getJobs)

// Export the router to use in your main app
module.exports = router;
