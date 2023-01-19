var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.get('/', function (req, res, next) {
  return res.status(200).json({
      "success": true,
      "message": 'respond with a resource'
    });
});

router.post('/signup', async (req, res) => {
  let user;
  try {
    const pass = await bcrypt.hash(req.body.password, 10);
    user = new User({
      username: req.body.username,
      password: pass
    });
    await user.save();
  } catch (error) {
    console.log(error);
  }
  if (user) {
    return res.status(200).json({
      "success:": true,
      "message": "user signed up"
    });
  } else {
    return res.status(500).json({
      "success": false,
      "message": "something went wrong"
    });
  }
});

// Blog admin log-in route
router.post('/login', async (req, res) => {
  let user = await User.findOne({
    username: req.body.username
  });
  if (!user) {
    return res.status(404).json({
      "success": false,
      "message": "User not found"
    });
  }
  let match = await bcrypt.compare(req.body.password, user.password);
  if (!match) {
    return res.status(403).json({
      "success": false,
      "message": "Wrong password"
    });
  }

  const payload = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' });

  return res.status(200).json({
    "success": true,
    "message": "Correct password",
    "token": "Bearer " + token
  });
});

module.exports = router;
