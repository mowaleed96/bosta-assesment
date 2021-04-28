module.exports = {
  PORT: process.env.PORT || 3000,
  db: process.env.MONGODB_URL || 'mongodb://localhost/nodejs_dev',
  email: process.env.EMAIL || '',
  emailPW: process.env.EMAIL_PASSWORD || '',
  emailService: process.env.EMAIL_SERVICE || 'gmail',
  baseURL: process.env.BASE_URL,
  tokenKey: process.env.TOKEN_KEY,
};
