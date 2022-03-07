const express = require('express');
const expressLayout = require('express-ejs-layouts');

//passport auth
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');

const MongoStore = require('connect-mongo');

//import mongoose
const db = require('./config/mongoose');
require('dotenv').config();
const port = 8000;

//creating express app
const app = express();

//template engine;
app.set('view engine', 'ejs');
app.set('views', './views');

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('assets'));

//express layouts
app.use(expressLayout);

//session setup
app.use(
  session({
    name: 'LoginWithAuth',
    secret: process.env.SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: process.env.MONGO_URL,
      },
      function (err) {
        console.log('error', err);
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

//controller
app.use('/', require('./route/index'));

//start server
app.listen(port, function (err) {
  if (err) {
    console.log('Server not found! :(');
    return;
  }
  console.log(`Server is running at http://localhost:${port}`);
});
