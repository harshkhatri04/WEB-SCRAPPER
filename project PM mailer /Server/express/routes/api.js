const User = require('../models/userModel')
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

// =============forgot password=============
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
//==================forgotPassword===============

var LocalStrategy = require('passport-local').Strategy;
var passport = require('passport');
module.exports = function(router) {

    router.post('/users', function(req, res) {

        var user = new User();
        user.name = req.body.name;
        user.password = req.body.password;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        //user.temporaryToken =  jwt.sign({ user }, config.secret);
        if (req.body.name == null || req.body.password == null || req.body.email == null || req.body.mobile == null) {
            res.json({ success: false, message: 'Ensure all the fields are filled' });
        } else {
            user.save(function(err) {
                if (err) {
                    if (err.errors.name) {
                        res.json({ success: false, message: err.errors.name.message });
                    }

                } else {
                         var transporter = nodemailer.createTransport({
                   service: 'gmail',
                   auth: {
                       user: 'personalizedemailer@gmail.com',
                       pass: 'niit@123'
                   }
               });

               var mailOptions = {
                   from: 'personalizedemailer@gmail.com',
                   to: user.email,
                   subject: 'Registered on Personalized-Emailer',
                text: 'Hello,\n\n' +
                  'You have been successfully registered on Personalized-Emailer.\n',

               };

               transporter.sendMail(mailOptions, function(error, info) {
                   if (error) {
                       console.log(error);
                   } else {
                       console.log('Email sent: ' + info.response);


                       //res.send(token);
                   
                   }
               });

                    res.json({ success: true, message: 'user created' });
                }


            })
        }
    });

    router.get('/', function(req, res) {
        User.find((err, data) => {
            if (err) console.log('error')
            else {
                res.json(data)
            }
        })
    })



    router.get('/signin/:email/:password', function(req, res) {

        console.log(req.params)
        User.findOne({
            email: req.params.email
        }, function(err, user) {
            if (err) throw err;

            if (!user) {

                res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                user.comparePassword(req.params.password, function(err, isMatch) {
                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign({ user }, config.secret);
                        // return the information including token as JSON
                        res.send({ success: true, token: 'JWT ' + token });
                        //console.log({ success: true, token: 'JWT ' + token })*/
                    } else {
                        //console.log("found")
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
    });


    /*==================reset pwd routes=================*/
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

    router.get('/forgot/:email', function(req, res, next) {

        console.log('reset')
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                    // console.log('err');
                });
            },

            function(token, done) {
                rpwtoken = token;
                console.log(req.params.email);
                User.findOne({ email: req.params.email }, function(err, user) {
                    if (!user) {
                        //console.log(email)

                        req.flash('error', 'No account with that email address exists.');
                        return res.redirect('/forgot');
                    }

                    user.resetPasswordToken = token;

                    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

                    user.save(function(err) {
                        done(err, token, user);
                    });
                });
            },
            function(token, user, done) {

                var nodemailer = require('nodemailer');

                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'personalizedemailer@gmail.com',
                       pass: 'niit@123'
                    }
                });

                var mailOptions = {
                    from: 'personalizedemailer@gmail.com',
                    to: user.email,
                    subject: 'Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        /*+ req.headers.host +*/
                        'http://localhost:3000/api/reset/' + token + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n',

                };

                transporter.sendMail(mailOptions, function(error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);


                        //res.send(token);
                        console.log(token);
                    }
                });


            }
        ], function(err) {
            if (err) return next(err);
            res.redirect('/forgot');
        });
        /*console.log(rpwtoken);
        res.send(rpwtoken);*/
    });

    router.get('/reset/:token', function(req, res) {
        var rpwtoken = req.params.token;
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('http://localhost:4200/forgot/');
            }
            res.redirect('http://localhost:4200/set/' + rpwtoken);

        });
    });


    router.post('/reset/:token', function(req, res) {
        console.log(req.params)
        console.log(req.body)
        async.waterfall([
            function(done) {
                User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
                    if (!user) {
                        console.log('err')
                        req.flash('error', 'Password reset token is invalid or has expired.');
                        return res.redirect('back');
                    }

                    user.password = req.body.password;
                    user.resetPasswordToken = undefined;
                    user.resetPasswordExpires = undefined;

                    user.save(function(err) {
                        req.logIn(user, function(err) {
                            done(err, user);
                        });
                    });
                });
            },
            /* function(user, done) {
               var smtpTransport = nodemailer.createTransport('SMTP', {
                 service: 'SendGrid',
                 auth: {
                   user: '!!! YOUR SENDGRID email !!!',
                   pass: '!!! YOUR SENDGRID PASSWORD !!!'
                 }
               });
               var mailOptions = {
                 to: user.email,
                 from: 'passwordreset@demo.com',
                 subject: 'Your password has been changed',
                 text: 'Hello,\n\n' +
                   'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
               };
               smtpTransport.sendMail(mailOptions, function(err) {
                 req.flash('success', 'Success! Your password has been changed.');
                 done(err);
               });
             }*/
        ], function(err) {
            res.redirect('/');
        });
    });

    /*=================reset pwd=================*/
    return router;
}