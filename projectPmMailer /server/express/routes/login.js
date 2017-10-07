const User = require('../models/userModel')
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const logger = require('../services/app.logger');
const express = require('express');
const router = express.Router();

// login url
router.get('/signin/:email/:password', function(req, res) {
    console.log(req.params.email)
    User.findOne({
        email: req.params.email
    }, function(err, user) {
        if (err) {
            return res.status(400).send({ success: false, message: 'There is error in finding' })
            logger.info("error");
        }
        if (!user) {

            return res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' })
            logger.info("Authentication failed. User not found");
            //res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.params.password, function(err, isMatch) {

                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    var token = jwt.sign({ user }, config.secret);
                    // return the information including token as JSON
                    //console.log('success')
                    return res.status(200).send({ success: true, token: 'JWT ' + token ,name:user.name,email:user.email,mobile:user.mobile,password:user.password});
                    logger.info("token generated successfully");
                    //console.log({ success: true, token: 'JWT ' + token })*/
                } else {
                    //console.log('success')
                    //console.log("found")
                    return res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                    logger.info("Authentication failed. Wrong password.");
                }
            });
        }
    });
});


   router.get('/', function(req, res) {
          User.find((err, data) => {
              if (err) {
                  res.send({ success: false, message: "error in finding" })
                  logger.info("error");
              } else {
                  res.json(data)
                  logger.info("data fetched successfully");
              }
          })
      })

module.exports = router;