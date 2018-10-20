const knex = require('./db');

const getAllAccounts = () => knex('accounts');
const getAccountById = id => knex('accounts').where('id', id).first();
const createAccount = payload => knex('accounts').insert(payload, '*');
const updateAccount = (id, payload) => knex('accounts').where('id', id).update({ ...payload, updated_at: knex.fn.now() }, '*');
const deleteAccount = id => knex('accounts').where('id', id).del();

module.exports = {
  getAllAccounts, getAccountById, createAccount, updateAccount, deleteAccount,
};
