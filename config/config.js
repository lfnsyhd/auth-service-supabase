require('dotenv').config();
const { parse } = require('pg-connection-string');

const databaseUrl = process.env.DATABASE_URL;
const config = parse(databaseUrl);

const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');


module.exports = {
  development: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: config.user,
    password: config.password,
    database: config.database,
    host: config.host,
    port: config.port,
    dialect: 'postgres',
    logging: false,
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    logging: false,
  },
};
