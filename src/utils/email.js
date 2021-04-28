const nodemailer = require('nodemailer');
const config = require('../../config');

const transporter = nodemailer.createTransport({
  service: config.emailService,
  auth: {
    user: config.email,
    pass: config.emailPW,
  },
});

const send = async ({
  to = '', subject = '', text = null, html = null,
}) => {
  const mailOptions = {
    to,
    subject,
    text,
    html,
    from: 'no-reply@bosta.co',
  };

  return new Promise((resolve, reject) => {
    transporter
      .sendMail(mailOptions)
      .then((info) => {
        console.log(`Email sent: ${info.response}`);
        resolve();
      })
      .catch((error) => reject(error));
  });
};

module.exports = { send };
