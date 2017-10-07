const configuration = require('./../config/googleAuth');
const express = require('express');
const router = express.Router();
const passport = require('passport');

/* GOOGLE ROUTER */
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', , 'https://www.googleapis.com/auth/plus.profile.emails.read']
    })
);

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: configuration.successRedirect,
        failureRedirect: configuration.failureRedirect
    })
);

module.exports = router;