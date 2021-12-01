const nodemailer = require('nodemailer');



module.exports = nodemailer.createTransport({
 host: "smtp.mailtrap.io",
  port: 587,
  secure: false, // upgrade later with STARTTLS
  auth: {
    user: "1863bf3fd3e3f7",
    pass: "e83ab572672f39",
  },
});