/* eslint-disable no-underscore-dangle */
const _ = require('lodash');
const { StatusCodes } = require('http-status-codes');
const { verifyHash } = require('../utils/password');
const {
  getUser, getUserById, verifyUser, createUser,
} = require('../services').userService;
const { createToken, generateVerificationEmail } = require('../services/token');
const { send: sendEmail } = require('../utils/email');
const config = require('../../config');

const signUp = async (req, res, next) => {
  const { body } = req;
  try {
    if (await getUser(body.email)) {
      res.statusCode = StatusCodes.CONFLICT;
      res.data = {
        status: false,
        error: 'User already exists!',
      };
    } else {
      const user = await createUser(body);

      const token = await createToken(user._id);

      sendEmail(
        {
          to: user.email,
          subject: 'Email Verification',
          html: generateVerificationEmail(
            user.firstName,
            `${config.baseURL}/user/verify/?userId=${user._id}&token=${token}&api_key=${user.email}`,
          ),
        },
      );

      console.log(user.email, 'signed up');
      res.data = _.omit(user, 'password');
      req.session.userData = _.omit(user, 'password');
      req.body.userId = user._id;
    }
  } catch (error) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.data = {
      status: false,
      error: error.message,
    };
  }
  next();
};

const verify = async (req, res, next) => {
  const { userId, token } = req.query;

  try {
    await verifyUser(userId, token);
    const user = await getUserById(userId);

    res.data = _.omit(user, 'password');
    req.session.userData = _.omit(user, 'password');
    req.body.userId = user._id;
    console.log(user.email, 'verified');
  } catch (error) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.data = {
      status: false,
      error: error.message,
    };
  }
  next();
};

const login = async (req, res, next) => {
  const { email, password: pwd } = req.body;

  try {
    const user = await getUser(email);

    if (user) {
      if (await verifyHash(pwd, user.password)) {
        res.data = _.omit(user, 'password');
        req.session.userData = _.omit(user, 'password');
        console.log(user.email, 'logged in');
      } else {
        res.statusCode = StatusCodes.BAD_REQUEST;
        res.data = {
          status: false,
          error: 'Invalid Password',
        };
      }
    } else {
      res.statusCode = StatusCodes.BAD_REQUEST;
      res.data = {
        status: false,
        error: 'Invalid email',
      };
    }
  } catch (error) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.data = {
      status: false,
      error: error.message,
    };
  }
  next();
};

module.exports = {
  signUp,
  verify,
  login,
};
