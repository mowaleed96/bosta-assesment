/* eslint-disable no-underscore-dangle */
const { StatusCodes } = require('http-status-codes');

const {
  createCheck, getAllChecks, getCheckById, updateCheck, removeCheck,
} = require('../services').userService;

const create = async (req, res, next) => {
  const { body, session } = req;
  const userId = session.userData._id;

  try {
    await createCheck({ userId, ...body });
    res.statusCode = StatusCodes.CREATED;
    res.data = {
      message: 'Check created',
    };
  } catch (error) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.data = {
      status: false,
      error: error.message,
    };
  }
  next();
};

const getAll = async (req, res, next) => {
  const userId = req.session.userData._id;
  try {
    const checks = await getAllChecks(userId);
    res.statusCode = StatusCodes.OK;
    res.data = {
      checks,
    };
  } catch (error) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.data = {
      status: false,
      error: error.message,
    };
  }
  next();
};

const get = async (req, res, next) => {
  const { body } = req;

  try {
    const check = await getCheckById(body._id);
    res.statusCode = StatusCodes.OK;
    res.data = {
      check,
    };
  } catch (error) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.data = {
      status: false,
      error: error.message,
    };
  }
  next();
};

const update = async (req, res, next) => {
  const { body } = req;

  try {
    await updateCheck(body);
    res.statusCode = StatusCodes.OK;
    res.data = {
      message: 'Check updated',
    };
  } catch (error) {
    res.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    res.data = {
      status: false,
      error: error.message,
    };
  }
  next();
};

const remove = async (req, res, next) => {
  const { body } = req;

  try {
    await removeCheck(body._id);
    res.statusCode = StatusCodes.OK;
    res.data = {
      message: 'Check deleted',
    };
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
  create, getAll, get, update, remove,
};
