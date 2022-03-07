const express = require('express');
const router = express.Router();
const passport = require('passport');

login = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/profile');
  }

  return res.render('login', {
    title: 'Login',
  });
};

router.get('/', login);

router.use('/user', require('./user'));

module.exports = router;
