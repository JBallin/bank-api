const seeds = [
  {
    id: 1,
    name: 'John Doe',
    bank_name: 'Bank of America',
    description: 'Main',
    transactions: [],
  },
  {
    id: 2,
    name: 'George Michael',
    bank_name: 'Citibank',
    description: 'Wife Account',
    transactions: [],
  },
  {
    id: 3,
    name: 'Michael Jordan',
    bank_name: 'Wells Fargo',
    description: 'Mansion Account',
    transactions: [],
  },
  {
    id: 4,
    name: 'Joe Shmoe',
    bank_name: 'Morgan Stanley',
    description: 'Investments',
    transactions: [],
  },
  {
    id: 5,
    name: 'Dwayne Carter',
    bank_name: 'Louisiana Bank',
    description: 'Play',
    transactions: [],
  },
  {
    id: 6,
    name: 'John Marshall',
    bank_name: 'Bank of America',
    description: 'Retirement savings',
    transactions: [],
  },
];

const seed = knex => knex('accounts')
  .del()
  .then(() => knex('accounts').insert(seeds))
  .then(() => knex.raw(
    'SELECT setval(\'"accounts_id_seq"\', (SELECT MAX("id") FROM "accounts"))',
  ));

module.exports = { seed, seeds };
