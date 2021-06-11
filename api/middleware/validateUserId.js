module.exports = (req, res, next) => {
      if (req.params.id) {
        req.user = req.params.id;
        next()
      } else {
        res.status(404).json({message: "user not found"})
      }
  }

  // - `validateUserId()`
//   - this middleware will be used for all user endpoints that include an `id` parameter in the url (ex: `/api/users/:id` and it should check the database to make sure there is a user with that id.
//   - if the `id` parameter is valid, store the user object as `req.user` and allow the request to continue
//   - if the `id` parameter does not match any user id in the database, respond with status `404` and `{ message: "user not found" }`