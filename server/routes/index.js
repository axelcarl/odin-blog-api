var express = require('express');
var router = express.Router();
const passport = require('passport');
const Post = require('../models/post');

router.get('/', async function(req, res, next) {
  let posts = [];
  try {
    posts = await Post.find();
  } catch (error) {
    console.log(error);
  }
  return res.status(200).json({
    "success": true,
    "posts": posts
  });
});

router.post('/posts', passport.authenticate('jwt', {session: false}), async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      message: req.body.message,
      postedAt: Date.now(),
    });
    await post.save();
    return res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred while creating the post' });
  }
});

router.get('/protected', passport.authenticate('jwt', {session: false}), (req, res) => {
  return res.status(200).json({
    "success": true,
    "message": "You are certified",
    "user": {
      username: req.user.username
    }
  });
});

router.post('/posts/:id/comment', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.comments.push(req.body.comment);
    await post.save();
    return res.status(201).json({message: 'Comment posted'});
  } catch (error) {
    console.log(error);
    return res.status(500).json({message: 'Something went wrong'});
  }

});

module.exports = router;