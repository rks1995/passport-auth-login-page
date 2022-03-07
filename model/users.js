const mongoose = require('mongoose');

// create schema for collection
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//create document using above schema
const User = mongoose.model('User', userSchema);
module.exports = User;
