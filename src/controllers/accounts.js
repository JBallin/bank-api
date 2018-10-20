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
  res.status(201);
  return sendResult(cb, args, res, next);
};

const updateAccount = (req, res, next) => {
  const [cb, args] = [model.updateAccount, [req.params.id, req.body]];
  return sendResult(cb, args, res, next);
};

const deleteAccount = (req, res, next) => {
  const [cb, args] = [model.deleteAccount, [req.params.id]];
  res.status(204);
  return sendResult(cb, args, res, next);
};

module.exports = {
  getAllAccounts, getAccountById, createAccount, updateAccount, deleteAccount,
};
