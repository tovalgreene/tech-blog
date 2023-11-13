const Sequelize = require('sequelize');
const config = require('./config'); 

let sequelize;

try {
  if (process.env.JAWSDB_URL) {
    sequelize = new Sequelize(process.env.JAWSDB_URL);
  } else {
    sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      {
        host: config.host,
        dialect: 'mysql',
        port: config.port,
        pool: {
          max: 5,
          min: 0,
          acquire: 30000,
          idle: 10000
        },
        logging: config.logging,
      }
    );
  }
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;
