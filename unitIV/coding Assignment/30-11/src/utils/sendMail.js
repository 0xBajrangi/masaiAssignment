const transporter = require('../config/mail');

//sending  a mail whever we create a new production mail

module.exports = (from, to, subject, text, html) => {
 const message =    {
        from,
            to,
            subject,
            text,
            html,
}
transporter.sendMail(message);
};