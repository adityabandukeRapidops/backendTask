const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
    service : "gmail",
    auth : {
        user : 'adityabanduke@gmail.com',
        pass : 'xyjtmivdvskvbmce'
    },
    debug: true
});

const mailOptions = {
    from : 'adityabanduke@gmail.com',
    to : 'rahul.rajput@rapidops.co',
    subject : 'Hii Baby',
    text : 'Kesi ho!!'
}

transporter.sendMail(mailOptions , function(error , info){
    if(error){
        console.log(error)
    }else{
        console.log('success' + info.response)
    }
})