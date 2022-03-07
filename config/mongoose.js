//import mongoose
const mongoose = require('mongoose');
const mongoUrl = 'mongodb://localhost/users';

//connect mongoose to mongodb server
mongoose.connect(mongoUrl);

//establish connection with server
const db = mongoose.connection;

//error in connection
db.on('error', console.error.bind(console, 'Error connecting to mongodb'));

//succesfull
db.once('open', function () {
  console.log('Successfull connection with mondodb!');
});

module.exports = db;
