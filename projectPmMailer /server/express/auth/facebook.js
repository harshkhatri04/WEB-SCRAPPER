var passport = require('passport')
  , FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/userModel');

passport.use(new FacebookStrategy({
    clientID: "1327893363986984",
    clientSecret: "ff73b6239dfda581c787dc66156440f1",
    callbackURL: "http:localhost/api/auth/facebook/callback"
  },
   function(accessToken, refreshToken, profile, done) {
        User.findOrCreate({ userid: profile.id }, { name: profile.displayName,userid: profile.id }, function(err, user) {
            if (err) { return done(err); }
            done(null, user);
        });
    }
));

module.exports = passport;