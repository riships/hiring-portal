const JobService = require('../model/jobs.model');

const getJobs = async function (req, res) {
    try {
        const jobId = req.query.id;
        let userData = JSON.parse(req.user)

        if (jobId) {
            let jobById = await JobService.findJobs(jobId);
            return res.render("jobs", { title: "Job", name: userData.name || null, jobs: jobById })
        }
        let getAllJobs = JobService.findJobs();
        return res.render("jobs", { title: "Jobs", name: userData.name || null, jobs: getAllJobs })
        // return res.status(200).json({ success: true, data: getAllJobs })
    } catch (error) {
        // return res.status(400).json({ success: false, error: error.message })
        return res.status(500).render('error', { title: "Error", name: null, message: 'Failed to load jobs. Please try again later.' });

    }

}
module.exports = { getJobs }