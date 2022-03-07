const express = require('express');

const User = require('../model/users');

profile = function (req, res) {
  return res.render('dashboard', {
    title: 'Profile',
  });
};

signUp = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/profile');
  }

  return res.render('signup', {
    title: 'Sign Up',
  });
};

signIn = function (req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/user/profile');
  }

  return res.redirect('/');
};

//creating user
create = async function (req, res) {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    User.create(req.body, function (err) {
      //handle error
      return res.redirect('/');
    });
  } else {
    return res.redirect('back');
  }
};

createSession = function (req, res) {
  return res.redirect('/user/profile');
};

destroySession = function (req, res) {
  res.clearCookie('LoginWithAuth');
  // req.logout();
  return res.redirect('/');
};

module.exports = {
  signIn,
  create,
  signUp,
  profile,
  createSession,
  destroySession,
};
