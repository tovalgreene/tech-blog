require('dotenv').config();

const production = {
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PW,
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3000,
  dialect: 'mysql',
  logging: false,
};

module.export = production; 
