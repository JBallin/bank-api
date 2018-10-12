const accountsQuery = require('../../queries/accounts');

const getAllAccounts = () => {
  const accounts = accountsQuery.getAllAccounts();

  return accounts.then(result => (result.length < 1 ? { error: 'error retrieving acounts', status: 500 } : result));
};

const getAccountById = (id) => {
  const account = accountsQuery.getAccountById(id);

  return account.then(result => (result.length < 1 ? { error: 'error retrieving acounts', status: 500 } : result));
};

module.exports = { getAllAccounts, getAccountById };
