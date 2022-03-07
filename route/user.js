const express = require('express');
const router = express.Router();

const passport = require('passport');

const {
  profile,
  signIn,
  signUp,
  create,
  createSession,
  destroySession,
} = require('../controller/user_controller');

router.get('/profile', passport.checkAuthentication, profile);
router.get('/signup', signUp);
router.get('/signin', signIn);
router.get('/signout', destroySession);

router.post('/create-user', create);
router.post(
  '/create-session',
  passport.authenticate('local', { failureRedirect: '/' }),
  createSession
);

module.exports = router;
