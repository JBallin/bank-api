const knex = require('knex');

const environment = process.NODE_ENV || 'development';
const knexFile = require('../knexfile');

module.exports = knex(knexFile[environment]);
