const express = require('express');
const { jobApply } = require('../controller/applicant.controller');
const router = express.Router();
const upload = require('../middleware/fileupload')
// Applicant api
router.post('/jobs/:id/applicants', upload, jobApply);


module.exports = router;
