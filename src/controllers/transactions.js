const model = require('../models/transactions');

const sendResult = async (cb, args, res, next) => {
  try {
    res.json(await cb(...args));
  } catch (err) {
    next({ message: err.message || err, status: err.status || 500 });
  }
};

const getAllTransactions = (req, res, next) => {
  const [cb, args] = [model.getAllTransactions, []];
  return sendResult(cb, args, res, next);
};

const getTransaction = (req, res, next) => {
  const [cb, args] = [model.getTransaction, [req.params.id]];
  return sendResult(cb, args, res, next);
};

const createTransaction = (req, res, next) => {
  const [cb, args] = [model.createTransaction, [req.body]];
  res.status(201);
  return sendResult(cb, args, res, next);
};

const updateTransaction = (req, res, next) => {
  const [cb, args] = [model.updateTransaction, [req.params.id, req.body]];
  return sendResult(cb, args, res, next);
};

const deleteTransaction = (req, res, next) => {
  const [cb, args] = [model.deleteTransaction, [req.params.id]];
  res.status(204);
  return sendResult(cb, args, res, next);
};

module.exports = {
  getAllTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction,
};
