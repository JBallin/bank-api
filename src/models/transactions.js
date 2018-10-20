/* eslint-disable no-throw-literal */

const query = require('../queries/transactions');

const validatePayload = (payload) => {
  const {
    account_id: accountId, title, amount, pending,
  } = payload;
  if (!accountId || !title || !amount || !pending) throw { message: 'Invalid input', status: 400 };
  return payload;
};

const getAllTransactions = () => query.getAllTransactions()
  .then((res, err) => {
    if (err) throw { message: 'Error getting transactions', status: 500, error: err };
    if (!res.length) throw { message: 'No transactions in system', status: 500 };
    return res;
  });

const getTransaction = id => query.getTransaction(id)
  .then((res, err) => {
    if (err) throw { message: 'Error getting transaction', status: 500, error: err };
    if (!res) throw { message: `No transaction with id ${id}`, status: 400 };
    return res;
  });

const createTransaction = (payload) => {
  const validatedPayload = validatePayload(payload);
  return query.createTransaction(validatedPayload)
    .then((result, err) => {
      if (err) throw { message: 'Error creating transaction', status: 500, error: err };
      const res = result[0];
      return res;
    });
};

const updateTransaction = (id, payload) => query.updateTransaction(id, payload)
  .then((result, err) => {
    const res = result[0];
    if (err) throw { message: 'Error updating transaction', status: 500, error: err };
    if (!res) throw { message: `No transaction with id ${id}`, status: 400 };
    return res;
  });

const deleteTransaction = id => query.deleteTransaction(id)
  .then((res, err) => {
    if (err) throw { message: 'Error deleting transaction', status: 500, error: err };
    if (!res) throw { message: `No transaction with id ${id}`, status: 400 };
    return res;
  });

module.exports = {
  getAllTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction,
};
