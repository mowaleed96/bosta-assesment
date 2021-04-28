const _ = require('lodash');
const { UserModel, TokenModel } = require('../models');
const { createHash } = require('../utils/password');

const createUser = async ({
  firstName, lastName, email, password,
}) => {
  const hashedPWD = await createHash(password);

  return new Promise((resolve, reject) => {
    UserModel
      .create({
        firstName,
        lastName,
        email,
        password: hashedPWD,
      })
      .then((user) => resolve(user))
      .catch((error) => reject(error));
  });
};

const getUser = async (email) => new Promise((resolve, reject) => {
  UserModel
    .findOne({ email })
    .then((user) => resolve(user))
    .catch((error) => reject(error));
});

const getUserById = async (userId) => new Promise((resolve, reject) => {
  UserModel
    .findOne({ _id: userId })
    .then((user) => resolve(user))
    .catch((error) => reject(error));
});

const getMultipleUsersByIds = async (userIds) => new Promise((resolve, reject) => {
  UserModel
    .findOne({ _id: { $in: userIds } })
    .then((user) => resolve(user))
    .catch((error) => reject(error));
});

const verifyUser = (userId, token) => new Promise((resolve, reject) => {
  TokenModel
    .findOneAndDelete({ _userId: userId, token })
    .then((doc) => {
      if (_.isEmpty(doc)) reject(new Error('not found'));
    });

  UserModel
    .updateOne(
      { _id: userId }, { active: true },
    )
    .then(() => resolve())
    .catch((error) => reject(error));
});

module.exports = {
  createUser,
  getUser,
  getUserById,
  verifyUser,
  getMultipleUsersByIds,
};
