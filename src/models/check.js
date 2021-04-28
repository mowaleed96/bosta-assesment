const { model } = require('mongoose');
const { CheckSchema } = require('../schemas');

module.exports = model('checks', CheckSchema);
