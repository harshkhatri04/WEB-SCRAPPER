let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let config = require('../config/database')
let connect = mongoose.connect('mongodb://192.168.252.47:27017/testing');
let currencymodel = require('../models/currencymodel')
let stockmodel = require('../models/stock')
let nasdaq = require('../models/nasdaq');
let request = require('request');
let CronJob = require('cron').CronJob;
let cheerio = require('cheerio');
let nodemailer = require('nodemailer');
let fundmodel = require('../models/fundsmodel')
let user = require('../models/userModel')
let configure = require('../config/configure');

//HTTP Post method end

//HTTP Get method start 
router.get('/details', function(req, res, next) {
    nasdaq.find((err, data) => {
        if (err) {
            console.log("error")

        } else {
            res.json(data)
        }
    })

})

router.get('/fund', function(req, res, next) {
    fundmodel.find((err, data) => {
        if (err) {
            console.log("error")

        } else {
            res.json(data)

        }
    })

})


router.get('/news/:id', function(req, res, next) {
    stockmodel.find({ term: req.params.id }, (err, data) => {
        if (err) {
            console.log("error")

        } else {
            res.json(data)

        }
    })

})

router.get('/currency', function(req, res, next) {
    currencymodel.find((err, data) => {
        if (err) {
            console.log("error")

        } else {
            res.json(data)

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
                let hupdown = $(this).find('#ms_quote_deltaBar').text();
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


            res.json({ data: stock });
        }
    })
});


function getnasdaq(data) {
    for (let i = 0; i < data.length; i++) {
        term = data[i].Code;
        liststockdata(term);
        // news(term);
    }

    function liststockdata(term) {
        request('http://quotes.wsj.com/' + term, function(error, response, html) {
            if (!error && response.statusCode == 200) {
                let $ = cheerio.load(html);


                $('#news_module li.cr_pressRelease').each(function(i, element) {
                    let news = $(this).next().text().trim();
                    let stockdata = {};
                    stockdata.term = term;
                    stockdata.news = news;

                    liststock = new stockmodel(stockdata);
                    liststock.save((err, data) => {
                        if (err) {
                            // logger.error('not found')
                            console.log('error')
                        } else if (data) {

                        }
                    });
                })
            }
        })
    }
}


function fundsnews() {

    let funddata = {};
    request('https://www.wsj.com/news/types/hedge-funds', function(error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
            let funds = [];
            $('#move_2 li').each(function(i, element) {
                let fundsdate = $(this).find('.time-container').text().trim();
                let fundsheadline = $(this).find('.headline').text().trim();
                let fundsnews = $(this).find('.summary-container').text().trim();

                funddata.Time = fundsdate;
                funddata.Headline = fundsheadline;
                funddata.News = fundsnews;

                let listoffund = new fundmodel(funddata)
                listoffund.save((err, data) => {
                    if (err) {
                        console.log("error")

                    } else if (data) {

                    }

                })
            });

        }
    })
}


function currencynews() {
    let currencydata = {};
    request('https://www.wsj.com/news/types/foreign-exchange', function(error, response, html) {
        if (!error && response.statusCode == 200) {
            let $ = cheerio.load(html);
            let currency = [];
            $('#move_2 li').each(function(i, element) {
                let cuurencydate = $(this).find('.time-container').text().trim();
                let currencyheadline = $(this).find('.headline').text().trim();
                let currencynews = $(this).find('.summary-container').text().trim();


                currencydata.Time = cuurencydate;
                currencydata.Headline = currencyheadline;
                currencydata.News = currencynews;
                let listofcurrency = new currencymodel(currencydata)
                listofcurrency.save((err, data) => {
                    if (err) {
                        console.log("error")

                    } else if (data) {
                        console.log("success", data)
                    }

                })

            });
        }
    })
}

/*This the cron job function to get all emailId and there preference set*/
var dailyMailJob = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    cronTime: '00 00 10 * * *',

    onTick: function(req, res) {
        user.find((err, data) => {
            if (err) {
                res.status(403).send({ success: false, message: 'You are unauthorized' })
            } else {

                for (let i = 0; i < data.length; i++) {

                    if (data[i].preferences[0].frequency == 'Daily') {
                        if (data[i].preferences[0].items[0].itemName == 'Nasdaq Stocks') {
                            stockmodel.find((err, stockData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, stockData)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            fundmodel.find((err, fundsData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, fundsData)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Currency') {
                            currencymodel.find((err, currencyData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, currencyData)
                                }
                            })
                        }

                    }

                }

            }
        })
    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
dailyMailJob.start();

/*This the cron job function to get all emailId and there preference set*/
var weeklyMailJob = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    cronTime: '00 40 09 * * 2',
    onTick: function(req, res) {
        user.find((err, data) => {
            if (err) {
                res.status(403).send({ success: false, message: 'You are unauthorized' })
            } else {
                for (let i = 0; i < data.length; i++) {

                    if (data[i].preferences[0].frequency == 'Weekly') {
                        if (data[i].preferences[0].items[0].itemName == 'Nasdaq Stocks') {
                            stockmodel.find((err, stockData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, stockData)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            fundmodel.find((err, fundsData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, fundsData)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Currency') {
                            currencymodel.find((err, currencyData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, currencyData)
                                }
                            })
                        }

                    }

                }

            }
        })
    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
weeklyMailJob.start();

/*This the cron job function to get all emailId and there preference set*/
var monthlyMailJob = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    cronTime: '00 40 09 10 * *',
    onTick: function(req, res) {
        user.find((err, data) => {
            if (err) {
                res.status(403).send({ success: false, message: 'You are unauthorized' })
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].preferences[0].frequency == 'Daily') {
                        if (data[i].preferences[0].items[0].itemName == 'Nasdaq Stocks') {
                            stockmodel.find((err, stockData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, stockData)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            fundmodel.find((err, fundsData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, fundsData)
                                }
                            })
                        } else if (data[i].preferences[0].items[0].itemName == 'Currency') {
                            currencymodel.find((err, currencyData) => {
                                if (err) {
                                    res.status(403).send({ success: false, message: 'You are unauthorized' })
                                } else {
                                    sendMails(data[i].email, currencyData)
                                }
                            })
                        }

                    }

                }

            }
        })
    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
monthlyMailJob.start();

function sendMails(emailId, fundsData) {
    let nodemailer = require('nodemailer');

    let transporter = nodemailer.createTransport({
        service: configure.serviceProvider,
        auth: {
            user: configure.mailSendingId,
            pass: configure.mailSendingPass
        }
    });

    let mailOptions = {
        from: configure.mailSendingId,
        to: emailId,
        subject: 'Personalized Emailer',
        html: "<ul>News</ul><br><li>" + fundsData + "</li>"

    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            /*logger.warn("network error");*/
            console.log("emailId is wrong " + emailId)
        } else {
            /* logger.info("Email sent to user to reset password");*/
            console.log("successfully to " + emailId)
        }
    });
}

/*This the cron job function to do scheduling on the nasdaq data*/
var job = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    cronTime: '00 37 15 * * *',
    onTick: function(req, res, next) {
        nasdaq.find((err, data) => {
            if (err) {
                console.log("error")
            } else {
                getnasdaq(data);
                fundsnews();
                currencynews();

            }
        })

    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
job.start();
//HTTP Post method for stock price of NASDAQ for WSJ website

module.exports = router;