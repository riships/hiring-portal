const JobService = require('../model/jobs.model');


const getJobs = async function (req, res) {
    let userData = null
    if (req.user) {
        userData = JSON.parse(req.user)
    }
    let lastActiveDate = null
    if (req.lastVisitDate) {
        lastActiveDate = req.lastVisitDate
    }
    try {
        const jobId = req.query.id || req.params.id;
        if (jobId) {
            let jobById = await JobService.findJobs(jobId);
            return res.render("jobview",
                {
                    titileActiveDate: [{ title: "Job", lastVisited: lastActiveDate }],
                    successMessage: false,
                    name: userData ? userData.name : null,
                    job: jobById
                })
        }
        let getAllJobs = JobService.findJobs();
        return res.render("jobs",
            {
                titileActiveDate: [{ title: "Jobs", lastVisited: lastActiveDate }],
                successMessage: false,
                name: userData ? userData.name : null,
                jobs: getAllJobs
            })
    } catch (error) {
        return res.status(500).render('error',
            {
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
                successMessage: false,
                name: userData ? userData.name : null,
                message: 'Failed to load jobs. Please try again later.'
            });

    }
}


const postJob = async function (req, res) {
    let userData = null
    if (req.user) {
        userData = JSON.parse(req.user)
    }
    let lastActiveDate = null
    if (req.lastVisitDate) {
        lastActiveDate = req.lastVisitDate
    }
    try {
        let jobData = req.body;
        if (!jobData) {
            return res.status(401).render('error',
                {
                    titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
                    successMessage: false,
                    name: userData ? userData.name : null,
                    message: 'Failed to post Job. Please try again later.'
                })
        }

        // Convert skillsrequired to an array if it's not already
        if (!Array.isArray(jobData.skillsrequired)) {
            jobData.skillsrequired = [jobData.skillsrequired];
        }


        let createJob = await JobService.createJobPost(jobData);

        if (!createJob) {
            return res.status(500).render('error', {
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
                name: req.user ? req.user.name : null,
                successMessage: false,
                message: 'Failed to post Job. Please try again later.'
            });
        }
        // Redirect to the job listing page or any other page after success
        return res.redirect('/jobs', 302,
            {
                title: "Jobs",
                successMessage: true,
                message: "Job Posted Successfully.",
                name: userData ? userData.name : null
            });
    }
    catch (error) {
        return res.status(500).render('error', {
            titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
            successMessage: false,
            name: userData ? userData.name : null,
            message: 'Failed to post Job due to an internal server error!'
        })
    }

}

const updateJob = async (req, res) => {
    let jobData = req.body;
    const jobId = req.query.id || req.params.id;
    let userData = null
    if (req.user) {
        userData = JSON.parse(req.user)
    }
    let lastActiveDate = null
    if (req.lastVisitDate) {
        lastActiveDate = req.lastVisitDate
    }
    try {
        if (!Object.keys(jobData).length > 0) {
            const jobData = JobService.findJobs(jobId);
            if (jobData) {
                return res.render("jobposting",
                    {
                        titileActiveDate: [{ title: "Edit Job", lastVisited: lastActiveDate }],
                        successMessage: false,
                        name: userData ? userData.name : null,
                        job: jobData
                    })
            }
        }

        if (Object.keys(jobData).length > 0) {
            let changeData = Object.fromEntries(
                Object.entries(jobData)
                    .filter(([key]) => !['_method'].includes(key))
            );
            let updatedJob = JobService.findAndupdateJob(jobId, changeData)
            if (updatedJob) {
                return res.redirect("/jobs", 200,
                    {
                        titileActiveDate: [{ title: "Jobs", lastVisited: lastActiveDate }],
                        successMessage: true,
                        message: "Job Updated Successfully.",
                        name: userData ? userData.name : null
                    })
            }
        }
    } catch (error) {
        console.log(error);

    }
}


const deleteJob = async (req, res) => {
    let jobId = req.params.id || req.query.id

    try {
        if (!jobId) {
            return res.status(500).render('error', {
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
                successMessage: false,
                name: userData ? userData.name : null,
                message: 'Failed to Delete Job!'
            })
        }
        let deletedJob = JobService.removeJob(jobId) 
        if (!deletedJob) {
            return res.status(403).render('error', {
                titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
                successMessage: false,
                name: userData ? userData.name : null,
                message: 'Failed to Delete Job Due to internal Server Error!'
            })
        }

        return res.status(200).json({ message:"Job deleted successfully." })

    } catch (error) {
        return res.status(401).render('error', {
            titileActiveDate: [{ title: "Error", lastVisited: lastActiveDate }],
            successMessage: false,
            name: userData ? userData.name : null,
            message: 'Failed to Delete Job Due to internal Server Error!'
        })
    }
    
}


module.exports = { getJobs, postJob, updateJob, deleteJob }