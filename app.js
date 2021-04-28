const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const { StatusCodes } = require('http-status-codes');
const config = require('./config');
const { routes } = require('./src');
const { clientApiKeyValidation, prepareSession, appendSessionToResponse } = require('./src/utils/auth');

const app = express();

app.use(express.urlencoded({
  extended: false,
}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Bosta assessment!');
});

app.use(clientApiKeyValidation);
app.use(prepareSession);

app.use(routes);

app.use(appendSessionToResponse);

const listen = () => app.listen(config.PORT, () => {
  console.log(`Listening on port ${config.PORT}`);
});

const connect = () => {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
    .once('open', listen);
  return mongoose.connect(config.db, {
    keepAlive: 1,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

connect();
