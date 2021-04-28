const { Schema } = require('mongoose');

module.exports = new Schema({
  token: { type: String, unique: true },
  _userId: { type: String, unique: true },
});
