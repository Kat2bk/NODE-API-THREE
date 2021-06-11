const express = require('express');
const {logger} = require('./middleware/middleware');
const userRouter = require('./users/users-router');
const server = express();

server.use(express.json());

// remember express by default cannot parse JSON in request bodies

// global middlewares and the user's router need to be connected here
server.use(logger())

server.use('/api/users', userRouter)

server.get('/', (req, res) => {
  // throw new Error('arrghh')
  res.send(`<h2>Let's write some middleware!</h2>`);
});

 server.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({message: "Something went wrong, try again"})
})

module.exports = server;
