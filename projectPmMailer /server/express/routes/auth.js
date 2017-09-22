const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportGoogle = require('../auth/google');
const config = require('./../config/googleAuth')


/* GOOGLE ROUTER */
router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['https://www.googleapis.com/auth/plus.login', , 'https://www.googleapis.com/auth/plus.profile.emails.read']
    })
);

router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: config.successRedirect,
        failureRedirect: config.failureRedirect
    })
);
/* GOOGLE ROUTER Ends */


module.exports = router;