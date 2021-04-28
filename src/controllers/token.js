const crypto = require('crypto');
const { StatusCodes } = require('http-status-codes');
const config = require('../../config');
const { TokenModel } = require('../models');
const { send: sendEmail } = require('../utils/email');

// eslint-disable-next-line no-underscore-dangle
const _generateVerificationEmail = ({ name, link }) => `<p>Hello ${name},</p>
  
<p>Thanks for registering in our service, visit the link bellow to verify you email:</p>
<p><a href="${link}">Verify</a></p>
`;

const signUp = (req, res) => {
  const { body: { userId, email, firstName } } = req;

  TokenModel.create({ _userId: userId, token: crypto.randomBytes(128).toString('hex') })
    .then((doc) => {
      sendEmail({
        to: email,
        subject: 'Email Verification',
        html: _generateVerificationEmail({ name: firstName, link: `${config.baseURL}/verify/${userId}/${doc.token}` }),
      });
      res.sendStatus(StatusCodes.CREATED);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  signUp,
};
