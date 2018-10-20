const seeds = [
  {
    id: 1,
    name: 'John Doe',
    bank_name: 'Bank of America',
    description: 'Main',
  },
  {
    id: 2,
    name: 'George Michael',
    bank_name: 'Citibank',
    description: 'Wife Account',
  },
  {
    id: 3,
    name: 'Michael Jordan',
    bank_name: 'Wells Fargo',
    description: 'Mansion Account',
  },
  {
    id: 4,
    name: 'Joe Shmoe',
    bank_name: 'Morgan Stanley',
    description: 'Investments',
  },
  {
    id: 5,
    name: 'Dwayne Carter',
    bank_name: 'Louisiana Bank',
    description: 'Play',
  },
  {
    id: 6,
    name: 'John Marshall',
    bank_name: 'Bank of America',
    description: 'Retirement savings',
  },
];

const seed = knex => knex('accounts')
  .del()
  .then(() => knex('accounts').insert(seeds))
  .then(() => knex.raw(
    'SELECT setval(\'"accounts_id_seq"\', (SELECT MAX("id") FROM "accounts"))',
  ));

module.exports = { seed, seeds };
