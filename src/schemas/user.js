const { Schema } = require('mongoose');

module.exports = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: { type: String, default: '' },
  active: { type: Boolean, default: false },
});
