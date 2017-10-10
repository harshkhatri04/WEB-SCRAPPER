const configurationFb = require('./../config/facebookAuth');
const express = require('express');
const router = express.Router();
const passport = require('passport');


/* FACEBOOK ROUTER */
router.get('/auth/facebook',
   passport.authenticate('facebook', { scope: 'email' })
);

router.get('/auth/facebook/callback',
   passport.authenticate('facebook', {
       successRedirect: configurationFb.successRedirect,
       failureRedirect: configurationFb.failureRedirect
   })
);
passport.serializeUser(function(user, done) {
   console.log(user);
   done(null, user._id);
});

/*passport.deserializeUser(function(id, done) {
   user.findById(id, function(err, user) {
       done(err, user);
   });
});

router.use(passport.initialize());
router.use(passport.session());*/
module.exports = router;