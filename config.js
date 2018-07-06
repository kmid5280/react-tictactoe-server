'use strict';

module.exports = {
  PORT: process.env.PORT || 8080,
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://obscure-cliffs-37897.herokuapp.com',
  /*CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'https://localhost:3000',*/
  DATABASE_URL:
        process.env.DATABASE_URL || 'mongodb://localhost/react-tictactoe-capstone',
  TEST_DATABASE_URL:
        process.env.TEST_DATABASE_URL ||
        'mongodb://localhost/react-tictactoe-capstone-test',
      JWT_SECRET: process.env.JWT_SECRET,
      JWT_EXPIRY: process.env.JWT_EXPIRY || '7d'

};
