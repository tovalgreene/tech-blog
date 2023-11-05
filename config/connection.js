const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL) 
  : new Sequelize(
      process.env.DB_NAME, 
      process.env.DB_USER, 
      process.env.DB_PASSWORD, 
      {
        port: process.env.DB_PORT || 3001,
        logging: false,
        dialectOptions: {
          ...(process.env.DB_DIALECT === 'mysql' && {
            dateStrings: true,
            typeCast: true,
          }),
        },
        pool: {
          max: 5, 
          min: 0, 
          acquire: 30000, 
          idle: 10000, 
        },
      }
    );

module.exports = sequelize;
