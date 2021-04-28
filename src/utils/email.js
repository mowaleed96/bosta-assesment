const nodemailer = require('nodemailer');
const config = require('../../config');

const transporter = nodemailer.createTransport({
  service: config.emailService,
  auth: {
    user: config.email,
    pass: config.emailPW,
  },
});

const send = ({
  to = '', subject = '', text = null, html = null,
}) => {
  const mailOptions = {
    to,
    subject,
    text,
    html,
    from: 'no-reply@bosta.co',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log(`Email sent: ${info.response}`);
    }
  });
};

module.exports = { send };
