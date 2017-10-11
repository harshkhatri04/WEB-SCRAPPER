/* importing predefined  dependencies */
const express = require('express'); 
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');

// importing user defined dependencies
const routes = require('./routes/route');
const config = require('./config/database')
const logger = require('./services/app.logger');
const configure = require('./config/configure')
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt-nodejs');
const async = require('async');
const crypto = require('crypto');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const connect = mongoose.connect(config.database);
let cors = require('cors');

// using middleware for cross origin resource sharing or cross domain access control
app.use(cors());

// using middleware for creating session for user
app.use(session({
    secret: 's3cr3t',
    resave: true,
    saveUninitialized: true
}));

// using middleware for passport
app.use(passport.initialize());
app.use(passport.session());

// using middleware for parsing request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'session secret key' }));
app.use(flash());
app.use(cookieParser());
app.use('/', routes);

// app runs on port 3000
app.listen(config.port, () => {
  logger.info("application running on port" + config.port);
});

module.exports = app;