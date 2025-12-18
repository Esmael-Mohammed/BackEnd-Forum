
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DATABASE,   // database name
  process.env.USER,       // username
  process.env.PASSWORD,   // password
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,       // disable SQL logs
  }
);

module.exports = sequelize;
