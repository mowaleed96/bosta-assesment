const { model } = require('mongoose');
const { ReportSchema } = require('../schemas');

module.exports = model('reports', ReportSchema);
