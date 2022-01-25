const hostName = process.env.is_docker ? "db" : "localhost";

module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: hostName, //postgres://db:5432
    port: '5432',
    user: 'postgres',
    password: 'wellsfargo22',
    database: 'to_do_app_tasks'
  }
});