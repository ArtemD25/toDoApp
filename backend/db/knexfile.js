module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: '5432',
    user: 'postgres',
    password: 'wellsfargo22',
    database: 'to_do_app_tasks'
  }
});