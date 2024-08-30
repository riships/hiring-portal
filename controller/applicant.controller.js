const { v4: uuidv4 } = require('uuid');
const JobService = require('../model/jobs.model');
const ApplicantsService = require('../model/applicants.model');
const path = require('path');

const jobApply = async (req, res) => {
    try {
        let jobById = req.params.id || req.query.id;
        let applicantData = req.body;

        console.log(req.file);

        let applicantId = uuidv4();

        // Check if the file exists and generate the file path
        if (req.file && req.file.filename) {
            let filePath = req.get('origin') + '/public/uploads/' + req.file.filename;
            applicantData['resumePath'] = filePath;
        }

        // Create applicant and await the promise
        let createdApplicant = await ApplicantsService.createApplicant({ applicantid: applicantId, ...applicantData });

        // If the applicant was created, add them to the job
        if (createdApplicant) {
            await JobService.addApplicantToJob(jobById, applicantId);
        }

        // Send a success response to the client
        // return res.redirect("/jobs", 200, { )
        return res.redirect("/jobs/" + jobById, 200, { title: "Jobs", successMessage: true, message: "Application submitted successfully", name: null });

    } catch (error) {
        console.log(error);

        // Send an error response to the client
        res.status(500).send({ message: 'An error occurred while applying for the job' });
    }
}

module.exports = { jobApply };
