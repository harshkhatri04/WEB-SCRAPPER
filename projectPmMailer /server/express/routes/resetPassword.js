const User = require('../models/userModel')
const configure = require('../config/configure');
const nodemailer = require('nodemailer');
const express = require('express');
const async = require('async');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('../services/app.logger');
const crypto = require('crypto');

//reset pwd routes
passport.use(new LocalStrategy(function(email, password, done) {
    User.findOne({ email: email }, function(err, user) {
        if (err) return done(err);
        if (!user) return done(null, false, { message: 'Incorrect email.' });
        user.comparePassword(password, function(err, isMatch) {
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password.' });
            }
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
// route to provide token on forgotpassword
router.get('/forgot/:email', function(req, res, next) {
    async.waterfall([
        function(done) {
            crypto.randomBytes(20, function(err, buf) {
                var token = buf.toString('hex');
                done(err, token);
            });
        },
        //function to check that email id exists or not
        function(token, done) {
            rpwtoken = token;
            User.findOne({ email: req.params.email }, function(err, user) {
                if (!user) {

                    logger.warn("No account with that email address exists.");
                    return res.status(400).send({ success: false, message: 'No account with that email address exists' });

                }

                user.resetPasswordToken = token;
                user.resetPasswordExpires = Date.now() + configure.tokenValidity; // 1 hour validity for link
                user.save(function(err) {
                    done(err, token, user);
                });
            });
        },
        //function to send a reset link on email
        function(token, user, done) {



            var nodemailer = require('nodemailer');

            var transporter = nodemailer.createTransport({
                service: configure.serviceProvider,
                auth: {
                    user: configure.mailSendingId,
                    pass: configure.mailSendingPass
                }
            });

            var mailOptions = {
                from: configure.mailSendingId,
                to: user.email,
                subject: 'Password Reset',
                text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    configure.resetLinkUrl + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n',

            };

            transporter.sendMail(mailOptions, function(error, info) {
                if (error) {
                    logger.warn("network error");
                } else {
                    logger.info("Email sent to user to reset password");
                }
            });
        }
    ], function(err) {
        if (err) return next(err);
        res.redirect('/forgot');
        logger.info('redirect to forgot')
    });
});
// route to take reset password request
router.get('/reset/:token', function(req, res) {
    var rpwtoken = req.params.token;
    //checking token validity
    User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
        if (!user) {
            logger.warn("Password reset token is invalid or has expired.");
            return res.json({ success: false, message: 'Password reset token is invalid or has expired.' });
        }
        res.redirect(configure.OnSuccessRedirect + rpwtoken);
        logger.warn("redirect to reset password page");

    });
});
//route to reset password
router.post('/reset/:token', function(req, res) {
    async.waterfall([
        function(done) {
            User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                if (!user) {
                    logger.warn("Password reset token is invalid or has expired.");
                    return res.send({ success: false, message: 'Password reset token is invalid or has expired.' });
                }
                user.password = req.body.password;
                user.resetPasswordToken = undefined;
                user.resetPasswordExpires = undefined;
                //saving password
                user.save(function(err) {
                    req.logIn(user, function(err) {
                        done(err, user);
                    });
                });
            });
        },

    ], function(err) {
        if (err) return next(err);
        logger.info("password successfully changed")
        res.send({ success: true });

    });
});

module.exports = router;