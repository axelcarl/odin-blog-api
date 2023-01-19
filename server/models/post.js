const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  message: String,
  postedAt: Date,
  comments: [String]
});

module.exports = mongoose.model('Post', postSchema);