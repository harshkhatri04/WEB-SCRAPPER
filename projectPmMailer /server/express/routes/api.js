const User = require('../models/userModel')
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const configure = require('../config/configure');
const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

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
const router = express.Router();
//forgotPassword End

const passport = require('passport');

let nasdaq = require('../models/nasdaq');
let request = require('request');
let cheerio = require('cheerio');

/*const connect = mongoose.connect('mongodb://localhost/testing');*/
const passportGoogle = require('../auth/google');
const configuration = require('./../config/googleAuth');
const passportFacebook = require('../auth/facebook');

    
    
    /*  router.get('/', function(req, res) {
          User.find((err, data) => {
              if (err) {
                  res.send({ success: false, message: "error in finding" })
                  logger.info("error");
              } else {
                  res.json(data)
                  logger.info("data fetched successfully");
              }
          })
      })*/

    



    //Dashboard

    //HTTP Post method Start
    router.post('/news', function(req, res, next) {
        let term = req.body.term;
        request('http://quotes.wsj.com/' + term, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(html);
                let currency = [];

                $('#news_module li.cr_pressRelease').each(function(i, element) {
                    let news = $(this).next().text().trim();
                    let metadata = {
                        Company: term,
                        News: news
                    }
                    currency.push(metadata);
                });
                logger.info("currency");
                // console.log(currency);
                res.status(200).json({ data: currency });
            }
        })
    });
    //HTTP Post method end

    //HTTP Get method start 
    router.get('/details', function(req, res, next) {
        nasdaq.find((err, data) => {
            if (err) {
                logger.error("error")
                res.status(400).json({ success: false, message: "Bad request" })
            } else {
                res.status(200).json(data)
                // console.log(data)
                logger.error("nasdaq details found")
            }
        })

    })


    //HTTP Get method start

    //HTTP Post method for stock price of NASDAQ for WSJ website

    router.post('/stock', function(req, res, next) {
        let term = req.body.term;
        request('http://quotes.wsj.com/' + term, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(html);
                let stock = [];
                $('.charts-datacol').each(function(i, element) {
                    let close = $(this).find('.crinfo_time').text().trim();
                    let price = $(this).find('span#quote_val').text().trim();
                    let updown = $(this).find('li.crinfo_diff').text().trim();
                    let hours = $(this).find('.c_crinfo_sub h5').text().trim();
                    let hPrice = $(this).find('span#ms_quote_val').text().trim();
                    let hupdown = $(this).find('span.deltaBar-pos').text();

                    let metadata1 = {
                        closeAt: close,
                        Price: price,
                        upDown: updown,
                        hours: hours,
                        hPrice: hPrice,
                        hupdown: hupdown,

                    }
                    stock.push(metadata1);
                });

                logger.info("stock data price of NASDAQ")
                // console.log(stock);
                res.status(200).json({ data: stock });
            }
        })
    });

    
    /* GOOGLE ROUTER Ends */
    

    module.exports=router;