function logger() {
  return (req, res, next) => {
  const time = new Date();
  console.log(`${req.method} request to ${req.url} at ${time}`);
  next();
  }
}

// `logger()`
//   - `logger` logs to the console the following information about each request: request method, request url, and a timestamp
//   - this middleware runs on every request made to the API

function validateUser(req, res, next) {
  if (req.body && req.body.name) {
    next();
  } else if (req.body && !req.body.name) {
    res.status(400).json({message: "missing required name field"})
  }
}

// - `validateUser()`
//   - `validateUser` validates the `body` on a request to create or update a user
//   - if the request `body` lacks the required `name` field, respond with status `400` and `{ message: "missing required name field" }`

function validatePost(req, res, next) {
  if (req.body && req.body.text) {
    next();
  } else if (req.body && !req.body.text) {
    res.status(400).json({message: "missing required text field"})
  }
}

// - `validatePost()`
//   - `validatePost` validates the `body` on a request to create a new post
//   - if the request `body` lacks the required `text` field, respond with status `400` and `{ message: "missing required text field" }`

module.exports = {
  logger,
  validateUser,
  validatePost
};