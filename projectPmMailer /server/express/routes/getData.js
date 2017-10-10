const User = require('../models/userModel')
const configure = require('../config/configure');
const nodemailer = require('nodemailer');
const express = require('express');
const async = require('async');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const logger = require('../services/app.logger');
const crypto = require('crypto');


router.get('/findUser/:email',function(req,res) {

          User.findOne({email:req.params.email},(err,data)=>{
            if(err){
              res.send({success:false,message:'user not found'})
            }else{
              res.json(data);
            }
          })
        })

module.exports = router;