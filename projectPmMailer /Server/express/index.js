const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = express.Router();
const routes = require('./routes/api')(router);
const path = require('path');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cors= require('cors')

 /*======forgot password====*/
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcrypt-nodejs');
var async = require('async');
var crypto = require('crypto');
var flash = require('express-flash');

var logger = require('morgan');
var cookieParser = require('cookie-parser');


 /*========================*/

// Middleware
app.use(cors());

app.use(session({
  secret: 's3cr3t',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname + '/public'));
app.use('/api',routes);

 //reset pwd middleware
app.use(logger('dev'));
app.use(session({ secret: 'session secret key' }));
app.use(flash());
app.use(cookieParser());
/*=====================*/

app.get('/',function(req,res){
 res.sendFile(path.join(__dirname+'/public/app/views/index.html'))
});
const db = 'mongodb://localhost/testing';
mongoose.connect(db,(err)=>{
	if(err)
		console.log('error occurred')
	else
		console.log('connected ')

})




app.listen(3000,()=>{
	console.log('listening ');
});

module.exports = app;