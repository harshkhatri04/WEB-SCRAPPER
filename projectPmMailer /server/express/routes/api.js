const User = require('../models/userModel')
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const configure = require('../config/configure');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

//forgot password
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const flash = require('express-flash');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
//forgotPassword End

const passport = require('passport');

let nasdaq = require('../models/nasdaq');
let request = require('request');
let cheerio = require('cheerio');

const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://admin:admin@192.168.252.203:27018/personalizedmailer');
/*const connect = mongoose.connect('mongodb://localhost/testing');*/
const passportGoogle = require('../auth/google');
const configuration = require('./../config/googleAuth');
const passportFacebook = require('../auth/facebook');

module.exports = function(router) {
    // signup url
    router.post('/users', (req, res) => {
        let user = new User();
        user.name = req.body.name;
        user.password = req.body.password;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        // checking if fields are empty or not
        if (req.body.name == null || req.body.password == null || req.body.email == null || req.body.mobile == null) {
            res.json({ success: false, message: 'Ensure all the fields are filled' });
        } else {

            user.save((err) => {
                // return name of error in case of error
                if (err) {

                    if (err.errors.name) {
                        res.json({ success: false, message: err.errors.name.message });
                    }

                } else {

                    let transporter = nodemailer.createTransport({
                        service: configure.serviceProvider,
                        auth: {
                            user: configure.mailSendingId,
                            pass: configure.mailSendingPass
                        }
                    });
                    // email template
                    let mailOptions = {
                        from: configure.mailSendingId,
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
                        }
                    });
                    res.json(" success: true, message: 'user created' ");
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
    // login url
    router.get('/signin/:email/:password', function(req, res) {
        console.log(req.params.email)
        User.findOne({
            email: req.params.email
        }, function(err, user) {
            if (err) {
                throw err;
            }
            if (!user) {

                res.send({ success: false, msg: 'Authentication failed. User not found.' })
                //res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
            } else {
                // check if password matches
                user.comparePassword(req.params.password, function(err, isMatch) {

                    if (isMatch && !err) {
                        // if user is found and password is right create a token
                        var token = jwt.sign({ user }, config.secret);
                        // return the information including token as JSON
                        //console.log('success')
                        res.send({ success: true, token: 'JWT ' + token });
                        //console.log({ success: true, token: 'JWT ' + token })*/
                    } else {
                        //console.log('success')
                        //console.log("found")
                        res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    }
                });
            }
        });
    });


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

        console.log('reset')
        async.waterfall([
            function(done) {
                crypto.randomBytes(20, function(err, buf) {
                    var token = buf.toString('hex');
                    done(err, token);
                    // console.log('err');
                });
            },
            //function to check that email id exists or not
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
                        /*+ req.headers.host +*/
                        configure.resetLinkUrl + token + '\n\n' +
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
    });
    // route to take reset password request
    router.get('/reset/:token', function(req, res) {
        var rpwtoken = req.params.token;
        //checking token validity
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect(configure.OnFailureRedirect);
            }
            res.redirect(configure.OnSuccessRedirect + rpwtoken);

        });
    });
    //route to reset password
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
                    //saving password
                    user.save(function(err) {
                        req.logIn(user, function(err) {
                            done(err, user);
                        });
                    });
                });
            },

        ], function(err) {
            res.redirect('/');
        });
    });

    //reset pwd end

    //route for logout
    router.get('/logout', function(req, res) {
        req.session.destroy();
        res.send("logout success!");
    });

    //Dashboard

    //HTTP Post method Start
    router.post('/news', function(req, res, next) {
        let term = req.body.term;
        request('http://quotes.wsj.com/' + term, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(html);
                let currency = [];

                $('#news_module li.cr_pressRelease').each(function(i, element) {
                    let news = $(this).next().text().trim();
                    let metadata = {
                        Company: term,
                        News: news
                    }
                    currency.push(metadata);
                });

                console.log(currency);
                res.json({ data: currency });
            }
        })
    });
    //HTTP Post method end

    //HTTP Get method start 
    router.get('/details', function(req, res, next) {
        nasdaq.find((err, data) => {
            if (err) {
                console.log("error")

            } else {
                res.json(data)
                console.log(data)
            }
        })

    })


    //HTTP Get method start

    //HTTP Post method for stock price of NASDAQ for WSJ website

    router.post('/stock', function(req, res, next) {
        let term = req.body.term;
        request('http://quotes.wsj.com/' + term, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(html);
                let stock = [];
                $('.charts-datacol').each(function(i, element) {
                    let close = $(this).find('.crinfo_time').text().trim();
                    let price = $(this).find('span#quote_val').text().trim();
                    let updown = $(this).find('li.crinfo_diff').text().trim();
                    let hours = $(this).find('.c_crinfo_sub h5').text().trim();
                    let hPrice = $(this).find('span#ms_quote_val').text().trim();
                    let hupdown = $(this).find('span.deltaBar-pos').text();

                    let metadata1 = {
                        closeAt: close,
                        Price: price,
                        upDown: updown,
                        hours: hours,
                        hPrice: hPrice,
                        hupdown: hupdown,

                    }
                    stock.push(metadata1);
                });

                console.log(stock);
                res.json({ data: stock });
            }
        })
    });

    //HTTP Post method for stock price of NASDAQ for WSJ website

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
    /* GOOGLE ROUTER Ends */
    /* FACEBOOK ROUTER */
    router.get('/auth/facebook',
        passportFacebook.authenticate('facebook'));

    router.get('/auth/facebook/callback',
        passportFacebook.authenticate('facebook', { failureRedirect: 'http://localhost:4200/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('http://localhost:4200/dashboard');
        });

    return router;
}