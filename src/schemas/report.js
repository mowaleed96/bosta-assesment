const { Schema } = require('mongoose');

module.exports = new Schema({
  checkId: { type: String, required: true },
  status: String,
  availability: Number,
  outages: Number,
  downtime: Number,
  uptime: Number,
  responseTime: Number,
  history: {
    timeStamp: Date,
    logs: Schema.Types.Mixed,
  },
});
