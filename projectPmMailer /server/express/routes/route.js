const config = require('../config/database');
const configure = require('../config/configure');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const flash = require('express-flash');
const logger = require('../services/app.logger');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express()
const router = express.Router();
const passportGoogle = require('../auth/google');
const configuration = require('./../config/googleAuth');
const passportFacebook = require('../auth/facebook');
const signup = require('./signup')
const login = require('./login')
const resetPassword = require('./resetPassword')
const logout = require('./logout')
const googleAuth = require('./googleAuth')
const facebookAuth = require('./facebookAuth')
const update = require('./update')

const preference = require('./preference')
const scrap = require('./scrap')
const index = require('./index')
const tweets = require('./tweets')
const liveTweets = require('./liveTweets')
app.use('/signup', signup);
app.use('/login', login);
app.use('/resetPwd', resetPassword);
app.use('/logout', logout);
app.use('/postNews', scrap);

app.use('/googleAuth', googleAuth);
app.use('/facebookAuth', facebookAuth);
app.use('/update',update);
app.use('/investment' , preference);
app.use('/', index);
app.use('/tweets', tweets);
// app.use('/liveTweets',liveTweets);

module.exports = app;

