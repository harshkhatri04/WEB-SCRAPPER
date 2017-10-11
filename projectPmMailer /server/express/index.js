const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

const config = require('./config/database')
const logger = require('./services/app.logger');
const configure = require('./config/configure')
const routes = require('./routes/route');

var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');

var cookieParser = require('cookie-parser');

const connect = mongoose.connect(config.database);
let cors = require('cors');

app.use(cors());

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

app.use(session({ secret: 'session secret key' }));
app.use(cookieParser());
app.use('/', routes);



app.listen(config.port, () => {


    logger.info("application running on port" + config.port);

});

module.exports = app;