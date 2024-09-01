const { v4: uuidv4 } = require('uuid');
const JobService = require('../model/jobs.model');
const ApplicantsService = require('../model/applicants.model');
const path = require('path');
const { sendMail } = require('../helper/nodemailer');
const { mailContent } = require('../helper/mailcontent');

const jobApply = async (req, res) => {
    let lastActiveDate = null
    if (req.lastVisitDate) {
        lastActiveDate = req.lastVisitDate
    }
    try {
        let jobById = req.params.id || req.query.id;
        let applicantData = req.body;
        let userData = null
        if (req.user) {
            userData = JSON.parse(req.user)
        }

        let applicantId = uuidv4();

        // Check if the file exists and generate the file path
        if (req.file && req.file.filename) {
            let filePath = '/public/uploads/' + req.file.filename;
            applicantData['resumePath'] = filePath;
        }

        // Create applicant and await the promise
        let createdApplicant = await ApplicantsService.createApplicant({ applicantid: applicantId, ...applicantData });

        // If the applicant was created, add them to the job
        let appliedJob = null
        if (createdApplicant) {
            appliedJob = await JobService.addApplicantToJob(jobById, applicantId);
        }

        // Send a success response to the client
        let companyname = appliedJob.companyname.replace(/[ .,;:!@#$%^&*()\-_=+[\]{}|\\/'"?<>~`]/g, '').toLocaleLowerCase();

        sendMail({ from: `no-reply@${companyname}.xyz`, to: createdApplicant.email, subject: "Job Application Received", html: mailContent(createdApplicant, appliedJob) })
        return res.status(200).render("jobview", { titileActiveDate : [{ title: "Jobs", lastVisited: lastActiveDate }], successMessage: true, message: "Application submitted successfully", name: userData ? userData.name : null, job: appliedJob });

    } catch (error) {
        // Send an error response to the client
        res.status(500).render("error", { titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }], name: userData ? userData.name : null, successMessage: false, message: 'An error occurred while applying for the job' });
    }
}



const jobApplicantsById = async (req, res) => {
    let userData = null;
    let jobId = req.query.id || req.params.id;
    if (req.user) {
        userData = JSON.parse(req.user);
    }
    if (req.user) {
        if (jobId) {
            let applicansList = JobService.getApplicatsOfJob(jobId)
            res.render("applicantsTable", { titileActiveDate: [{ title: "Applicants", lastVisited: lastActiveDate }], name: userData ? userData.name : null, successMessage: false, applicants: applicansList })
        }
    } else {
        res.status(401).render("error", { titileActiveDate: [{ title: "Not Authorize", lastVisited: lastActiveDate }], message:"You are not authorize to access this page.", name: userData ? userData.name : null, successMessage: false, applicants: null })
    }
}

module.exports = { jobApply, jobApplicantsById };
