/* eslint-disable no-throw-literal */

const query = require('../queries/accounts');

const validatePayload = (payload) => {
  const { name: customer, bank_name: bank, description } = payload;
  if (!customer || !bank || !description) throw { message: 'Invalid input', status: 400 };
  return payload;
};

const getAllAccounts = () => query.getAllAccounts()
  .then((res, err) => {
    if (err) throw { message: 'Error getting accounts', status: 500, error: err };
    if (!res.length) throw { message: 'No accounts in system', status: 500 };
    return res;
  });

const getAccountById = id => query.getAccountById(id)
  .then((res, err) => {
    if (err) throw { message: 'Error getting account', status: 500, error: err };
    if (!res) throw { message: `No account with id ${id}`, status: 400 };
    return res;
  });

const createAccount = (payload) => {
  const validatedPayload = validatePayload(payload);
  return query.createAccount(validatedPayload)
    .then((result, err) => {
      if (err) throw { message: 'Error creating account', status: 500, error: err };
      const res = result[0];
      return res;
    });
};

const updateAccount = (id, payload) => query.updateAccount(id, payload)
  .then((result, err) => {
    const res = result[0];
    if (err) throw { message: 'Error updating account', status: 500, error: err };
    if (!res) throw { message: `No account with id ${id}`, status: 400 };
    return res;
  });

const deleteAccount = id => query.deleteAccount(id)
  .then((res, err) => {
    if (err) throw { message: 'Error deleting account', status: 500, error: err };
    if (!res) throw { message: `No account with id ${id}`, status: 400 };
    return res;
  });

module.exports = {
  getAllAccounts, getAccountById, createAccount, updateAccount, deleteAccount,
};
