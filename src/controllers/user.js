/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const { StatusCodes } = require('http-status-codes');
const { UserModel, TokenModel } = require('../models');
const { createHash } = require('../utils/password');

const setUserActive = (userId) => UserModel.updateOne(
  { _id: userId }, { active: true },
).then(() => {
  TokenModel.deleteOne({ _userId: userId })
    .then(() => { console.log('user verified'); });
});

const signUp = async (req, res, next) => {
  const {
    body: {
      firstName, lastName, email, password,
    },
  } = req;

  UserModel.create({
    firstName,
    lastName,
    email,
    password: await createHash(password),
  }).then((user) => {
    req.body.userId = user._id;
    next();
  }).catch((err) => {
    console.log(err);
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  });
};

const verify = (req, res) => {
  const { userId, token } = req.params;

  TokenModel.find({ _userId: userId, token })
    .then((doc) => (_.isEmpty(doc)
      ? res.status(StatusCodes.NOT_FOUND).send('user not found!')
      : setUserActive(userId)
        .catch((err) => {
          console.log(err);
          res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
        })))
    .catch((err) => {
      console.log(err);
      res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    });
};

module.exports = {
  signUp,
  verify,
};
