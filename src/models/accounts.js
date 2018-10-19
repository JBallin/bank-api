/* eslint-disable no-throw-literal */

const accountsQuery = require('../../db/queries/accounts');

const getAllAccounts = () => {
  const accounts = accountsQuery.getAllAccounts();

  return accounts.then(result => (!result.length ? { error: 'Error retrieving accounts', status: 500 } : result));
};

const getAccountById = id => accountsQuery.getAccountById(id)
  .then(result => (!result ? { error: `Error retrieving account with id ${id}`, status: 500 } : result));


const createAccount = payload => accountsQuery.createAccount(payload)
  .then(res => (!res ? { error: 'error creating account', status: 500 } : res));

module.exports = { getAllAccounts, getAccountById, createAccount };
