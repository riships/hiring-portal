const JobService = require('../model/jobs.model');


const getJobs = async function (req, res) {
    let userData = null
    if (req.user) {
        userData = JSON.parse(req.user)
    }
    try {
        const jobId = req.query.id || req.params.id;
        if (jobId) {
            let jobById = await JobService.findJobs(jobId);
            return res.render("jobview", { title: "Job", name: userData ? userData.name : null, job: jobById })
        }
        let getAllJobs = JobService.findJobs();
        return res.render("jobs", { title: "Jobs", name: userData ? userData.name : null, jobs: getAllJobs })
        // return res.status(200).json({ success: true, data: getAllJobs })
    } catch (error) {
        // return res.status(400).json({ success: false, error: error.message })
        return res.status(500).render('error', { title: "Error", name: userData ? userData.name : null, message: 'Failed to load jobs. Please try again later.' });

    }

}


const postJob = async function (req, res) {
    let userData = null
    if (req.user) {
        userData = JSON.parse(req.user)
    }
    try {
        let jobData = req.body;
        if (!jobData) {
            return res.status(401).render('error', { title: "Error", name: userData ? userData.name : null, message: 'Failed to post Job. Please try again later.' })
        }

        // Convert skillsrequired to an array if it's not already
        if (!Array.isArray(jobData.skillsrequired)) {
            jobData.skillsrequired = [jobData.skillsrequired];
        }


        let createJob = await JobService.createJobPost(jobData);

        if (!createJob) {
            return res.status(500).render('error', {
                title: "Error",
                name: req.user ? req.user.name : null,
                message: 'Failed to post Job. Please try again later.'
            });
        }
        // Redirect to the job listing page or any other page after success
        return res.redirect('/jobs', 302, { title: "Jobs", name: userData ? userData.name : null });
    }
    catch (error) {
        return res.status(500).render('error', {
            title: "Error",
            name: userData ? userData.name : null,
            message: 'Failed to post Job due to an internal server error!'
        })
    }

}
module.exports = { getJobs, postJob }