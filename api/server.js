const express = require('express')

const authRouter = require('../auth/auth-router')
const usersRouter = require('../users/users-router')
const restricted = require('../restricted/restricted-middleware')

const server = express()


server.use(express.json())
server.use('/api/users',usersRouter )
server.use('/api/auth', authRouter)

module.exports = server