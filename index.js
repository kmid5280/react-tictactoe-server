'use strict';

require('dotenv').config();
const express = require('express')
const cors = require('cors')
const {CLIENT_ORIGIN} = require('./config')

const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const passport = require('passport')
const { dbConnect } = require('./db-mongoose');
const { PORT, DATABASE_URL } = require('./config')
const { router: usersRouter } = require('./users')
const { router: statsRouter } = require('./stats')

const { router: authRouter, localStrategy, jwtStrategy } = require('./auth')

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204)
    }
    next();
})

passport.use(localStrategy);
passport.use(jwtStrategy)
const jwtAuth = passport.authenticate('jwt', {session: false})


app.use('/stats', statsRouter)
app.use('/users', usersRouter)
app.use('/auth', authRouter)


app.use(
  morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
    skip: (req, res) => process.env.NODE_ENV === 'test'
  })
);

app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);




function runServer(port = PORT) {
  const server = app
    .listen(port, () => {
      console.info(`App listening on port ${server.address().port}`);
    })
    .on('error', err => {
      console.error('Express failed to start');
      console.error(err);
    });
}

if (require.main === module) {
  dbConnect();
  runServer();
}

module.exports = { app };
