const ApplicantsService = require("./applicants.model");
const { v4: uuidv4 } = require('uuid');

module.exports = class JobService {
    static jobOpenings = [
        {
            id: '603d4f1f2f1b2c001c8b4567',
            jobcategory: 'Software Development',
            jobdesignation: 'Frontend Developer',
            joblocation: 'New York',
            companyname: 'Tech Innovations Inc.',
            salary: '$80,000 - $100,000',
            applyby: new Date('2024-09-30'),
            skillsrequired: ['React', 'JavaScript', 'CSS'],
            numberofopenings: 3,
            jobposted: new Date('2024-08-23'),
            applicants: []
        },
        {
            id: '603d4f1f2f1b2c001c8b4568',
            jobcategory: 'Data Science',
            jobdesignation: 'Data Analyst',
            joblocation: 'San Francisco',
            companyname: 'Data Solutions LLC',
            salary: '$90,000 - $110,000',
            applyby: new Date('2024-10-15'),
            skillsrequired: ['Python', 'SQL', 'Excel'],
            numberofopenings: 2,
            jobposted: new Date('2024-08-20'),
            applicants: []
        },
        {
            id: '603d4f1f2f1b2c001c8b4569',
            jobcategory: 'Product Management',
            jobdesignation: 'Product Manager',
            joblocation: 'Chicago',
            companyname: 'Innovative Products Co.',
            salary: '$100,000 - $120,000',
            applyby: new Date('2024-11-01'),
            skillsrequired: ['Project Management', 'Agile', 'Communication'],
            numberofopenings: 1,
            jobposted: new Date('2024-08-25'),
            applicants: []
        },
        {
            id: '603d4f1f2f1b2c001c8b4570',
            jobcategory: 'Marketing',
            jobdesignation: 'Marketing Specialist',
            joblocation: 'Austin',
            companyname: 'Marketing Pros Ltd.',
            salary: '$70,000 - $85,000',
            applyby: new Date('2024-09-10'),
            skillsrequired: ['SEO', 'Content Marketing', 'Social Media'],
            numberofopenings: 4,
            jobposted: new Date('2024-08-30'),
            applicants: []
        }
    ];
    constructor({ jobcategory, jobdesignation, joblocation, companyname, salary, applyby, skillsrequired, numberofopenings, jobposted }) {
        this.id = uuidv4();
        this.jobcategory = jobcategory;
        this.jobdesignation = jobdesignation;
        this.joblocation = joblocation;
        this.companyname = companyname;
        this.salary = salary;
        this.applyby = applyby;
        this.skillsrequired = skillsrequired;
        this.numberofopenings = numberofopenings;
        this.jobposted = jobposted;
        this.applicants = [];
    }


    static createJobPost(jobObj) {
        let createdJob = new JobService(jobObj);
        JobService.jobOpenings.push(createdJob);
        return createdJob
    }

    static findJobs(id) {
        if (id) {
            let job = this.jobOpenings.find(job => job.id === id);
            return job || null;
        }
        return this.jobOpenings;

    }

    static findAndupdateJob(id, updatedData) {
        let job = this.jobOpenings.find(job => job.id === id);
        if (!job) {
            return null;
        }
        Object.assign(job, updatedData);
        return job;
    }


    static getApplicatsOfJob(id) {
        let job = this.jobOpenings.find(job => job.id === id);
        if (!job) {
            return null;
        }

        const applicants = job.applicants.map(applicantId =>
            ApplicantsService.getApplicant(applicantId)
        ).filter(applicant => applicant !== null);
        return applicants;
    }

    static addApplicantToJob(jobId, applicantId) {
        if (!applicantId && !jobId) {
            return null;
        }

        let jobObj = this.jobOpenings.find(job.id === id);
        jobObj.applicants.push(applicantId)

    }

    static removeApplicant(jobId, applicantId) {
        if (!jobId && !applicantId) {
            return null;
        }
        let findJob = this.jobOpenings.find(job.id === jobId);
        let applicantIndex = findJob.applicants.findIndex(appli === applicantId);

        return findJob.applicants.splice(applicantIndex, 1)[0];

    }

}