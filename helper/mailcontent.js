const mailContent = (applicantDetails, jobDetails) => {
    let { jobdesignation, companyname } = jobDetails;
    let { name } = applicantDetails
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Application Received</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0">
        <tr>
            <td>
                <h2 style="color: #aa4dbc;">Application Received for ${jobdesignation}</h2>
                <p>Dear ${name},</p>
                <p>
                    Thank you for applying for the <strong>${jobdesignation}</strong> at <strong>${companyname}</strong>. 
                    We've received your application and will review it shortly.
                </p>
                <p>
                    If you're shortlisted, we'll contact you with the next steps. In the meantime, feel free to reach out if you have any questions.
                </p>
                <p>Thank you for considering <strong>${companyname}/strong>.</p>
                <p>
                    Best Regards,<br>
                    ${companyname}
                </p>
            </td>
        </tr>
    </table>
</body>
</html>
`
}

module.exports = { mailContent };