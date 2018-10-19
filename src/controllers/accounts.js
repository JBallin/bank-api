const model = require('../models/accounts');

const sendResult = async (cb, args, res, next) => {
  try {
    res.json(await cb(...args));
  } catch (err) {
    next({ message: err.message || err, status: err.status || 500 });
  }
};

const getAllAccounts = (req, res, next) => {
  const [cb, args] = [model.getAllAccounts, []];
  return sendResult(cb, args, res, next);
};

const getAccountById = (req, res, next) => {
  const [cb, args] = [model.getAccountById, [req.params.id]];
  return sendResult(cb, args, res, next);
};

const createAccount = (req, res, next) => {
  const [cb, args] = [model.createAccount, [req.body]];
  return sendResult(cb, args, res, next);
};

module.exports = { getAllAccounts, getAccountById, createAccount };
