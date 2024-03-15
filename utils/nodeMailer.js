const nodemailer = require('nodemailer');
async function sendEmail(to, subject, text) {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'adityabanduke@gmail.com',
            pass: 'xyjtmivdvskvbmce'
        },
        debug: true
    });

    const mailOptions = {
        from: 'adityabanduke@gmail.com',
        to: to,
        subject: subject,
        text: text
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error)
        } else {
            console.log('success' + info.response)
        }
    })

}

module.exports = sendEmail;