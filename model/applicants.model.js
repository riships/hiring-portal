module.exports = ApplicantsService = class {
    static allApplicant = []
    constructor(applicantid, name, email, contact, resumePath) {
        applicantid = this.applicantid;
        name = this.name;
        email = this.email;
        contact = this.contact;
        resumePath = this.resumePath;
    }

    static createApplicat(applicantid, name, email, contact, resumePath) {
        let applicant = new ApplicantsService(applicantid, name, email, contact, resumePath);
        if (!applicant) {
            return null;
        }
        return applicant;
    }

    static getAllApplicates(applicantid) {
        if (id) {
            return this.allApplicant.find(applicant.applicantid === applicantid);
        }
        return this.allApplicant;
    }


    static updateApplicant(applicantid, updatedData) {
        if (!applicantid) {
            return null
        }

        let updatedApplicant = this.allApplicant.find(applicant.applicantid === applicantid);

        Object.assign(updatedApplicant, updatedData);

        return updatedApplicant;
    }

    static removeApplicant(applicantid){
        if (!applicantid) {
            return null;
        }
        let deletedApplicant = this.allApplicant.find(applicant.applicantid === applicantid);

    }
}