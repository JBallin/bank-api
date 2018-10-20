/* eslint-disable no-throw-literal */

const query = require('../../db/queries/accounts');

const validatePayload = (payload) => {
  let updatedPayload = false;

  const {
    name: customer, bank_name: bank, description, transactions,
  } = payload;

  if (!customer || !bank || !description) throw { message: 'Invalid input', status: 400 };
  if (!transactions) updatedPayload = { ...payload, transactions: [] };

  return updatedPayload || payload;
};

const getAllAccounts = () => {
  const accounts = query.getAllAccounts();

  return accounts.then(result => (!result.length ? { error: 'Error retrieving accounts', status: 500 } : result));
};

const getAccountById = id => query.getAccountById(id)
  .then(result => (!result ? { error: `Error retrieving account with id ${id}`, status: 500 } : result));


const createAccount = (payload) => {
  const validatedPayload = validatePayload(payload);
  return query.createAccount(validatedPayload)
    .then((res, err) => {
      if (err) throw { message: 'Error creating account', status: 500, error: err };
      return res;
    });
};

const updateAccount = (id, payload) => query.updateAccount(id, payload)
  .then((res, err) => {
    if (err) throw { message: 'Error updating account', status: 500, error: err };
    return res;
  });

module.exports = {
  getAllAccounts, getAccountById, createAccount, updateAccount,
};
