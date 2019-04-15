const express = require('express')
const router = express.Router()
const {Workouts} = require('./models')
const passport = require('passport')
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const jwtAuth = passport.authenticate('jwt', {session: false})