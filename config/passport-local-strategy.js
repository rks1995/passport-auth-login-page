const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    function (email, password, done) {
      User.findOne({ email: email }, function (err, user) {
        if (err) {
          console.log('error', err);
          return done(err);
        }

        if (!user || user.password !== password) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  )
);

//serializing the user
passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

//desializing the user
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    if (err) {
      console.log('error in finding user', err);
      return done(err);
    }
    return done(null, user);
  });
});

//use function as middleware for checking if the user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  return res.redirect('/');
};

// if user is sign in send data to locals for the views in the response;
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }

  next();
};

module.exports = passport;
