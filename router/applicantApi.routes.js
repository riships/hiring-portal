const express = require('express');
const { jobApply, jobApplicantsById } = require('../controller/applicant.controller');
const router = express.Router();
const upload = require('../middleware/fileupload');
const { authMiddleware } = require('../middleware/auth');

// Applicant api
router.post('/jobs/:id/applicants', authMiddleware, upload, jobApply);

// Get all applicants for a Job
router.get('/jobs/:id/applicants', authMiddleware, jobApplicantsById)


module.exports = router;
