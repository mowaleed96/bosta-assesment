const { Schema } = require('mongoose');

module.exports = new Schema({
  userId: { type: String, require: true },
  name: { type: String, required: true },
  url: { type: String, required: true },
  protocol: { type: String, required: true },
  path: String,
  webhook: String,
  timeout: { type: Number, default: 5 * 1000 },
  interval: { type: Number, default: 10 * 1000 * 60 },
  threshold: { type: Number, default: 1 },
  authentication: {
    username: String,
    password: String,
  },
  httpHeaders: [
    {
      key: String,
      value: String,
    },
  ],
  assert: {
    statusCode: Number,
  },
  tags: [String],
  ignoreSSL: { type: Boolean, default: false },
  active: { type: Boolean, default: true },
  invokeHook: { type: Boolean, default: false },
});
