/* eslint-disable no-underscore-dangle */
const { CheckModel } = require('../models');

const createCheck = async (check) => new Promise((resolve, reject) => {
  CheckModel
    .create(check)
    .then((doc) => resolve(doc))
    .catch((error) => reject(error));
});

const getAllChecks = async (userId) => new Promise((resolve, reject) => {
  CheckModel
    .find({ userId })
    .then((doc) => resolve(doc))
    .catch((error) => reject(error));
});

const getCheckById = async (id) => new Promise((resolve, reject) => {
  CheckModel
    .findById(id)
    .then((doc) => resolve(doc))
    .catch((error) => reject(error));
});

const updateCheck = async (check) => new Promise((resolve, reject) => {
  CheckModel
    .updateOne({ _id: check._id }, check)
    .then((doc) => resolve(doc))
    .catch((error) => reject(error));
});

const removeCheck = async (id) => new Promise((resolve, reject) => {
  CheckModel
    .remove(id)
    .then((doc) => resolve(doc))
    .catch((error) => reject(error));
});

const getUrlSubscriptions = (url) => new Promise((resolve, reject) => {
  CheckModel
    .find({ url })
    .then((doc) => resolve(doc))
    .catch((error) => reject(error));
});

module.exports = {
  createCheck, getAllChecks, getCheckById, updateCheck, removeCheck, getUrlSubscriptions,
};
