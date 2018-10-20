exports.up = knex => knex.schema.createTable('transactions', (table) => {
  table.increments();
  table.integer('account_id').references('accounts.id');
  table.string('title').notNullable();
  table.decimal('amount').notNullable();
  table.boolean('pending').defaultTo(true);
  table.timestamps(true, true);
});

exports.down = knex => knex.schema.dropTable('transactions');
