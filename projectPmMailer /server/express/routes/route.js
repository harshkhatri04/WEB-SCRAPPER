const config = require('../config/database');
const configure = require('../config/configure');
//forgot password
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const flash = require('express-flash');
// const logger = require('morgan');
const logger = require('../services/app.logger');
const cookieParser = require('cookie-parser');


const express = require('express');
const app = express()
const router = express.Router();
//forgotPassword End

/*const connect = mongoose.connect('mongodb://localhost/testing');*/
const passportGoogle = require('../auth/google');
const configuration = require('./../config/googleAuth');
const passportFacebook = require('../auth/facebook');
//const delete=require('./routes/delete')
const signup = require('./signup')
const login = require('./login')
const resetPassword = require('./resetPassword')
const logout = require('./logout')
/*const postNews = require('./postNews')
const getNews = require('./getNews')*/
const googleAuth = require('./googleAuth')
const facebookAuth = require('./facebookAuth')
const api = require('./api')



app.use('/signup', signup);
app.use('/login', login);
app.use('/resetPwd', resetPassword);
app.use('/logout', logout);
app.use('/postNews', api);
app.use('/getNews', api);
app.use('/googleAuth', googleAuth);
app.use('/facebookAuth', facebookAuth);

module.exports= app;