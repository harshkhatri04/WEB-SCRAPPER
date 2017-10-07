const passportFacebook = require('../auth/facebook');
const express = require('express');
const router = express.Router();


/* FACEBOOK ROUTER */
router.get('/auth/facebook',
    passportFacebook.authenticate('facebook'));

router.get('/auth/facebook/callback',
    passportFacebook.authenticate('facebook', { failureRedirect: 'http://localhost:4200/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:4200/dashboard');
    });
module.exports = router;