const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const usersRouter = require('./users/router');

const server = express();

// MIDDLEWARE //
server.use(express.json());
server.use(helmet());
server.use(cors());

// ROUTERS //
server.use('/api/users', usersRouter);

module.exports = server;