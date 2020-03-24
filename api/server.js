const express = require('express')
const session = require("express-session"); //import session from express-session

const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/users-router')
const restricted = require('../restricted/restricted-middleware')

const server = express()

//To use sessions we need to have sessionConfig object
const sessionConfig = {
    name: "monster",
    secret: "keep it secret, keep it safe!",
    cookie: {
      maxAge: 1000 *60, //This cookie is for 1 minute(*60 if want for an hour)
      secure: false, // true in production to send only over https
      httpOnly: true, // true means no access from JS
    },
    resave: false,
    saveUninitialized: true, // GDPR laws require to check with client
  };


server.use(express.json())
server.use(session(sessionConfig));

server.use('/api/users',restricted, usersRouter )
server.use('/api/auth', authRouter) //You can skip "auth" if like

module.exports = server