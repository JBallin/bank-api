const seeds = [
  {
    id: 1,
    account_id: 2,
    title: 'Safeway',
    amount: 40.79,
    pending: false,
  },
  {
    id: 2,
    account_id: 5,
    title: 'Chipotle',
    amount: 10.74,
    pending: true,
  },
  {
    id: 3,
    account_id: 6,
    title: 'Target',
    amount: 480.52,
    pending: false,
  },
  {
    id: 4,
    account_id: 1,
    title: 'Wingstop',
    amount: 4.82,
    pending: false,
  },
  {
    id: 5,
    account_id: 3,
    title: 'Amazon',
    amount: 127.21,
    pending: true,
  },
  {
    id: 6,
    account_id: 1,
    title: 'Ozumo',
    amount: 76.20,
    pending: false,
  },
];

const seed = knex => knex('transactions')
  .del()
  .then(() => knex('transactions').insert(seeds))
  .then(() => knex.raw(
    'SELECT setval(\'"transactions_id_seq"\', (SELECT MAX("id") FROM "transactions"))',
  ));

module.exports = { seed, seeds };
