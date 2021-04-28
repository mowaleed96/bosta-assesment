const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./config');
const { routes } = require('./src');

const app = express();

app.use(express.urlencoded({
  extended: false,
}));
app.use(express.json());
app.use(cors());

app.use(routes);

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
