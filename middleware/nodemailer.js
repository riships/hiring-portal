const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "rishi.edunext@gmail.com",
        pass: "Rishi@9598$"
    }
});


const sendMail = async (data) => {
    const { from, to, subject, html } = data;
    const mailOptions = {
        from: from,
        to: to,
        subject: subject,
        html: html,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // Rethrow the error if you want it to be handled further up the call stack
    }
};


module.exports = { sendMail };
