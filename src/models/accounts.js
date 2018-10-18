const accountsQuery = require('../../queries/accounts');

const getAllAccounts = () => {
  const accounts = accountsQuery.getAllAccounts();

  return accounts.then(result => (!result.length ? { error: 'error retrieving acounts', status: 500 } : result));
};

const getAccountById = id => accountsQuery.getAccountById(id)
  .then(result => (!result ? { error: 'error retrieving acounts', status: 500 } : result));


module.exports = { getAllAccounts, getAccountById };
