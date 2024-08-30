module.exports = class ApplicantsService {
    static allApplicant = []
    constructor(applicantid, name, email, contact, resumePath) {
        this.applicantid = applicantid;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumePath = resumePath;
        this.appliedOn = new Date();
    }

    static createApplicant(applicantData) {
        const { applicantid, name, email, contact, resumePath } = applicantData
        
        let applicant = new ApplicantsService(applicantid, name, email, contact, resumePath);
        if (!applicant) {
            return null;
        }
        return applicant;
    }

    static getApplicantes(applicantid) {
        if (id) {
            return this.allApplicant.find(applicant => applicant.applicantid === applicantid);
        }
        return this.allApplicant;
    }


    static updateApplicant(applicantid, updatedData) {
        if (!applicantid) {
            return null
        }

        let updatedApplicant = this.allApplicant.find(applicant => applicant.applicantid === applicantid);

        Object.assign(updatedApplicant, updatedData);

        return updatedApplicant;
    }

    static removeApplicant(applicantid) {
        if (!applicantid) {
            return null;
        }
        let applicantIndex = this.allApplicant.findIndex(applicant => applicant.applicantid === applicantid);

        if (applicantIndex === -1) {
            return null;
        }

        return this.allApplicant.slice(applicantIndex, 1)[0];
    }
}