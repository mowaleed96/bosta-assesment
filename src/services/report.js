const { ReportModel } = require('../models');
const { send } = require('../utils/email');

const initReport = async (checkId, url) => new Promise((resolve, reject) => {
  ReportModel
    .create({
      checkId,
      url,
      history: {
        timeStamp: new Date(),
        logs: 'init',
      },
    })
    .then((report) => resolve(report))
    .catch((error) => reject(error));
});

const changeReportsStatus = async (url, status) => new Promise((resolve, reject) => {
  ReportModel
    .updateMany({ url }, { status })
    .then(() => resolve())
    .catch((error) => reject(error));
});

const getReport = async (checkId) => new Promise((resolve, reject) => {
  ReportModel
    .find({ checkId })
    .then((report) => resolve(report))
    .catch((error) => reject(error));
});

const getAllReports = async (userId) => new Promise((resolve, reject) => {
  ReportModel
    .find({ userId })
    .then((report) => resolve(report))
    .catch((error) => reject(error));
});

const generateStatusEmail = (name, url, status) => `Hello ${name},
  Based on your subscription, we would like to inform you that
  the status of the following url status changet to ${status}
  
  ${url}`;

const sendStatusEmails = async (url, status, users) => new Promise(() => {
  const promises = users.emails.map((user) => send({
    to: user.email,
    subject: 'Subscription Status Changes',
    text: generateStatusEmail(user.firstName, url, status),
  }));

  return Promise.all(promises);
});

// TODO: send notifications using webhooks
const sendNotifications = (url, status, checks) => new Promise((resolve) => {
  resolve({ url, status, checks });
});
module.exports = {
  initReport, changeReportsStatus, getReport, getAllReports, sendStatusEmails, sendNotifications,
};
