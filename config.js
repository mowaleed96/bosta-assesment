module.exports = {
  PORT: process.env.PORT || 3000,
  db: process.env.MONGODB_URL || 'mongodb://localhost/nodejs_dev',
  email: process.env.EMAIL || 'm7mdoscar@gmail.com',
  emailPW: process.env.EMAIL_PASSWORD || '',
  emailService: process.env.EMAIL_SERVICE || 'gmail',
  baseURL: process.env.BASE_URL || 'http://192.168.1.2:3000',
  tokenKey: process.env.TOKEN_KEY || 'this is a secret key',
  jwtKey: process.env.JWT_KEY || 'JWT_KEY',
};
