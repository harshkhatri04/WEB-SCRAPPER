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

module.exports = router;