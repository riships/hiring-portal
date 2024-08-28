const { getJobs, postJob } = require('../controller/jobs.controller');
const express = require('express');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Define your route for getting jobs
router.get('/jobs', authMiddleware, getJobs)


router.get("/jobs/:id", authMiddleware, getJobs)


router.post("/jobs", authMiddleware, postJob)

// Export the router to use in your main app
module.exports = router;
