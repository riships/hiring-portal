const JobService = require('../model/jobs.model');

const getJobs = async function (req, res) {
    try {
        const jobId = req.query.id;        
        if (jobId) {
            let jobById = await JobService.findJobs(jobId);
            return res.status(200).json({ success: true, data: jobById })
        }
        let getAllJobs = JobService.findJobs();
        return res.status(200).json({ success: true, data: getAllJobs })
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message })
    }

}
module.exports = { getJobs }