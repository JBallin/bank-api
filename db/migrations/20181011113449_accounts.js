exports.up = knex => (
  knex.schema.createTable('accounts', (table) => {
    table.increments();
    table.string('name').notNullable();
    table.string('bank_name').notNullable();
    table.string('description').notNullable();
    table.timestamps(true, true);
  })
);

exports.down = knex => knex.schema.dropTable('accounts');
