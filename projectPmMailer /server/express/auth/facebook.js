	  var passport = require('passport')
	    , FacebookStrategy = require('passport-facebook').Strategy;
	  var User = require('../models/userModel');
	  const config = require('../config/facebookAuth')

	  passport.use(new FacebookStrategy({

	          // pull in our app id and secret from our auth.js file
	          clientID: config.clientID,
	          clientSecret: config.clientSecret,
	          callbackURL: config.callbackURL

	      },

	      // facebook will send back the token and profile
	   function(token, refreshToken, profile, done) {

	          // asynchronous
	          process.nextTick(function() {

	              // find the user in the database based on their facebook id
	              User.findOne({ 'facebook.id' : profile.id }, function(err, user) {

	                  // if there is an error, stop everything and return that
	                  // ie an error connecting to the database
	                  if (err)
	                      return done(err);

	                  // if the user is found, then log them in
	                  if (user) {
	                      return done(null, user); // user found, return that user
	                  } else {
	                      // if there is no user found with that facebook id, create them
	                      var  user = new User({
	                      name: profile.displayName,
	                      email: profile.emails[0].value ,  });
	                      // facebook can return multiple emails so we'll take the first
	    
	                      // save our user to the database
	                      user.save(function(err) {
	                          if (err)
	                              throw err;

	                          // if successful, return the new user
	                          return done(null, user);
	                      });
	                  }

	              });
	          });

	      }));



	  module.exports = passport;