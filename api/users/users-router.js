const express = require('express');
const userData = require('./users-model');
const postData = require('../posts/posts-model');
const {validateUser, validatePost} = require('../middleware/middleware');

// You will need `users-model.js` and `posts-model.js` both
// The middleware functions also need to be required

const router = express.Router();

function validateUserId(req, res, next) {
    if (req.params.id) {
      req.user = req.params.id;
      next()
    } else {
      res.status(404).json({message: "user not found"})
    }
}

router.get('/', async (req, res, next) => {
  // RETURN AN ARRAY WITH ALL THE USERS
  try {
    const users = await userData.get();
    if (users) {
      res.status(200).json(users)
    } 
  } catch (error) {
    console.log(error.message)
    next(error)
  }

});

router.get('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE USER OBJECT
  // this needs a middleware to verify user id
  try {
    const user = await userData.getById(req.params.id)
      res.status(200).json(user)
  } catch (error) {
    console.error(error.message)
    next(error)
  }
});

router.post('/', validateUser, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER OBJECT
  // this needs a middleware to check that the request body is valid
  try {
    const newUser = await userData.insert(req.body)
    res.status(201).json(newUser)
  } catch (error) {
    next(error)
  }
});

router.put('/:id', validateUserId, validateUser, async (req, res, next) => {
  // RETURN THE FRESHLY UPDATED USER OBJECT
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const updated = await userData.update(req.params.id, req.body)
      res.status(200).json(updated)
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', validateUserId, async (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
  // this needs a middleware to verify user id
  try {
    const deleted = await userData.remove(req.params.id)
    res.status(200).json(deleted)
  } catch (error) {
    next(error)
  }
});

router.get('/:id/posts', validateUserId, async (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
  // this needs a middleware to verify user id
  try {
    const userPosts = await userData.getUserPosts(req.params.id)
    res.status(200).json(userPosts)
  } catch (error) {
    next(error)
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
  // this needs a middleware to verify user id
  // and another middleware to check that the request body is valid
  try {
    const createPost = {
      user_id: req.params.id,
      text: req.body.text
    }

    const newPost = await postData.insert(createPost)
    res.status(201).json(newPost)
  } catch (error) {
    next(error)
  }
});

// do not forget to export the router

module.exports = router;