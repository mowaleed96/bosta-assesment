const _ = require('lodash');
const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const SECRET_KEY = require('../../config').jwtKey;
const { getUser } = require('../services').userService;

const newSessionsRoutes = [
  { path: '/user/login', method: 'POST' },
  { path: '/user/signup', method: 'POST' },
  { path: '/user/verify/', method: 'GET' },
];

const isNewSessionRequired = (httpMethod, url) => !!_.find(
  newSessionsRoutes, { method: httpMethod, path: url.split('?')[0] },
);

const generateJWTToken = (userData) => jwt.sign(JSON.stringify(userData), SECRET_KEY);

const verifyToken = (jwtToken) => {
  try {
    return jwt.verify(jwtToken, SECRET_KEY);
  } catch (error) {
    console.log(error);
    return null;
  }
};

const clientApiKeyValidation = async (req, res, next) => {
  const clientApiKey = req.get('api_key') || req.query.api_key;
  if (!clientApiKey) {
    return res.status(StatusCodes.BAD_REQUEST).send({
      status: false,
      response: 'Missing Api Key',
    });
  }

  next();
};

const prepareSession = async (req, res, next) => {
  const apiUrl = req.originalUrl;
  const httpMethod = req.method;
  req.session = {};
  if (isNewSessionRequired(httpMethod, apiUrl)) {
    req.newSessionRequired = true;
  } else {
    const authHeader = req.header('Authorization');
    const sessionID = authHeader.split(' ')[1];
    if (sessionID) {
      const userData = verifyToken(sessionID);
      if (userData) {
        req.session.userData = userData;
        req.session.sessionID = sessionID;
      } else {
        return res.status(StatusCodes.UNAUTHORIZED).send({
          ok: false,
          error: {
            reason: 'Invalid Session token',
            code: StatusCodes.UNAUTHORIZED,
          },
        });
      }
    } else {
      return res.status(StatusCodes.UNAUTHORIZED).send({
        ok: false,
        error: {
          reason: 'Missing Session token',
          code: StatusCodes.UNAUTHORIZED,
        },
      });
    }
  }
  next();
};

const appendSessionToResponse = (req, res) => {
  if (!res.data) {
    return res.status(StatusCodes.NOT_FOUND).send({
      status: false,
      error: {
        reason: 'Invalid Endpoint',
        code: StatusCodes.NOT_FOUND,
      },
    });
  }
  if (req.newSessionRequired && req.session.userData) {
    try {
      res.setHeader('session-token',
        generateJWTToken(req.session.userData));
      res.data['session-token'] = generateJWTToken(req.session.userData);
    } catch (error) {
      console.log(error);
    }
  }
  if (req.session && req.session.sessionID) {
    try {
      res.setHeader('session-token', req.session.sessionID);
      res.data['session-token'] = req.session.sessionID;
    } catch (error) {
      console.log(error);
    }
  }
  res.status(res.statusCode || StatusCodes.OK)
    .send({ response: res.data });
};

module.exports = {
  clientApiKeyValidation,
  isNewSessionRequired,
  generateJWTToken,
  verifyToken,
  prepareSession,
  appendSessionToResponse,
};
