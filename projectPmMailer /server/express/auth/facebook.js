var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/userModel');
const config = require('../config/facebookAuth')

passport.use(new FacebookStrategy({

    // pull in our app id and secret from our auth.js file
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.callbackURL,
    profileFields: ['id', 'displayName', 'emails']
}, function(accessToken, refreshToken, profile, done) {
    
    var facebookEmail = new User({
        email: profile.email,
        name: profile.displayName
    });

    /* save if new */
    User.findOne({ email: facebookEmail.email }, function(err, user) {
        if (!user) {
            facebookEmail.save(function(err, facebookEmail) {
                if (err) return done(err);
                done(null, facebookEmail);
            });
        } else {

            done(null, user);
        }
    });
}));
module.exports;