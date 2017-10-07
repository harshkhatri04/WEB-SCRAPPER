const express = require('express');
const app = express();
const mongoose = require('mongoose');

const connect = mongoose.connect('mongodb://admin:admin@192.168.252.203:27018/personalizedmailer');

const routes = require('./routes/route');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
//const cors = require('cors');
const config = require('./config/database')
const logger = require('./services/app.logger');
const configure = require('./config/configure')

/*======forgot password====*/
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');

// var logger = require('morgan');
var cookieParser = require('cookie-parser');


/*========================*/

// Middleware
//app.use(cors());

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});

app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

//reset pwd middleware
// app.use(logger('dev'));
app.use(session({ secret: 'session secret key' }));
app.use(flash());
app.use(cookieParser());
app.use('/', routes);

/*const db = 'mongodb://localhost/testing';
mongoose.connect(db, (err) => {
    if (err)
        console.log('error occurred')
    else
        console.log('connected ')

})*/

app.listen(config.port, () => {

    logger.info("application running on port "+config.port);

});

module.exports = app;