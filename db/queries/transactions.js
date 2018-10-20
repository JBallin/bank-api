const knex = require('./db');

const getAllTransactions = () => knex('transactions');
const getTransaction = id => knex('transactions').where('id', id).first();
const createTransaction = payload => knex('transactions').insert(payload, '*');
const updateTransaction = (id, payload) => knex('transactions').where('id', id).update({ ...payload, updated_at: knex.fn.now() }, '*');
const deleteTransaction = id => knex('transactions').where('id', id).del();

module.exports = {
  getAllTransactions, getTransaction, createTransaction, updateTransaction, deleteTransaction,
};
