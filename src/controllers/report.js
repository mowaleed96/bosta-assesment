/* eslint-disable no-underscore-dangle */
const { StatusCodes } = require('http-status-codes');

const {
  getReport, getAllReports, changeReportsStatus, sendStatusEmails, sendNotifications,
} = require('../services').reportService;
const { getUrlSubscriptions } = require('../services').checkService;
const { getMultipleUsersByIds } = require('../services').userService;

const get = async (req, res, next) => {
  const { checkId } = req.query;

  try {
    const report = await getReport(checkId);

    res.statusCode = StatusCodes.OK;
    res.data = {
      report,
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
    const reports = await getAllReports(userId);
    res.statusCode = StatusCodes.OK;
    res.data = {
      reports,
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

const changeStatus = async (req, res, next) => {
  const { body: { url, status } } = req;

  try {
    await changeReportsStatus(url, status);

    const subscriptions = await getUrlSubscriptions(url);
    const userIds = subscriptions.map((sub) => sub.userId);
    const users = await getMultipleUsersByIds(userIds);

    sendStatusEmails(url, status, users);
    sendNotifications(url, status, subscriptions);
    res.statusCode = StatusCodes.OK;
    res.data = {
      message: 'status updated',
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

module.exports = { get, getAll, changeStatus };
