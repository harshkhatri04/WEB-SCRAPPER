var express = require('express');
var routers = express.Router();

var passportGoogle = require('../auth/google');

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Please Sign In with:' });
});

router.get('/google',
  passportGoogle.authenticate('google', { scope: 'https://www.google.com/m8/feeds' }));

router.get('/google/callback',
  passportGoogle.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = routers;
