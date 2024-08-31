module.exports = class ApplicantsService {
    static allApplicant = [{ "applicantid": 1, "name": "Rishi", "email": "avviare.rishi@gmail.com", "contact": "9315265049", "resumePath": "/public/uploads/StockVerificationExportToPdf.pdf", "applicationDate": "Sat Aug 31 2024 12:05:24 GMT+0530 (India Standard Time)" }]
    constructor(applicantid, name, email, contact, resumePath) {
        this.applicantid = applicantid;
        this.name = name;
        this.email = email;
        this.contact = contact;
        this.resumePath = resumePath;
        this.applicationDate = new Date();
    }

    static createApplicant(applicantData) {
        const { applicantid, name, email, contact, resumePath } = applicantData

        let applicant = new ApplicantsService(applicantid, name, email, contact, resumePath);        
        if (!applicant) {
            return null;
        }
        this.allApplicant.push(applicant);
        return applicant;
    }

    static getApplicantes(applicantid) {
        if (applicantid) {
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