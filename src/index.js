import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
const LocalStrategy = require('passport-local').Strategy;

import config from './config';
import routes from './routes';

const logger = (req, res, next)=> {
  console.log(`Requested: ${req.originalUrl}`);
  next()
};
let app = express().use(logger);
app.server = http.createServer(app);

app.use(bodyParser.json({
  limit: config.bodyLimit
}));

app.use(passport.initialize());
let Account = require('./model/account');
passport.use(new LocalStrategy({
  usernameField: "email",
  passwordField: "password"
},
  Account.authenticate()
));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.serializeUser());

app.use('/v1', routes);

app.server.listen(config.port);
console.log(`started on port ${app.server.address().port}`);


export default app;
