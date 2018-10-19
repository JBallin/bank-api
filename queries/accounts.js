const knex = require('./db');

const getAllAccounts = () => knex('accounts').orderBy('created_at', 'desc');
const getAccountById = id => knex('accounts').where('id', id).first();
const createAccount = payload => knex('accounts').insert(payload, '*');

module.exports = { getAllAccounts, getAccountById, createAccount };
