const { model } = require('mongoose');
const { TokenSchema } = require('../schemas');

module.exports = model('tokens', TokenSchema);
