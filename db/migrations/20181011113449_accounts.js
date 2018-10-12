exports.up = knex => (
  knex.schema.createTable('accounts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('bank_name').notNullable();
    table.string('description').notNullable();
    table.specificType('transactions', 'text[]');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  })
);

exports.down = knex => knex.schema.dropTable('accounts');
