const crypto = require('crypto');
const { TokenModel } = require('../models');

const generateVerificationEmail = (name, link) => `<p>Hello ${name},</p>
  
<p>Thanks for registering in our service, visit the link bellow to verify you email:</p>
<p><a href="${link}">Verify</a></p>
`;

const createToken = async (userId) => new Promise((resolve, reject) => {
  TokenModel
    .create({ _userId: userId, token: crypto.randomBytes(128).toString('hex') })
    .then((doc) => resolve(doc.token))
    .catch((error) => reject(error));
});

module.exports = {
  createToken,
  generateVerificationEmail,
};
