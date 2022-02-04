const hostName = process.env.is_docker ? "db" : "localhost";

module.exports = require('knex')({
  client: 'pg',
  connection: {
    host: hostName,
    port: '5432',
    user: 'postgres',
    password: '12345',
    database: 'to_do_app_tasks'
  }
});