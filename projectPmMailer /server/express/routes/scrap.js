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
    date = new Date();
    fundmodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }, (err, data) => {
        if (err) {
            console.log("error")

        } else {
            res.json(data)

        }
    })

})


router.get('/news/:id', function(req, res, next) {
    date = new Date();
    stockmodel.find({ term: req.params.id, day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }, (err, data) => {
        if (err) {
            console.log("error")

        } else {
            res.json(data)

        }
    })

})

router.get('/currency', function(req, res, next) {
    date = new Date();
    currencymodel.find({ day: date.getDay(), month: date.getMonth(), year: date.getFullYear() }, (err, data) => {
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
    console.log("============================",term)
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
                    date = new Date();
                    stockdata.day = date.getDay();
                    stockdata.month = date.getMonth();
                    stockdata.year = date.getFullYear();
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
                date = new Date();
                date = new Date();
                funddata.day = date.getDay();
                funddata.month = date.getMonth();
                funddata.year = date.getFullYear();

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
                date = new Date();
                currencydata.day = date.getDay();
                currencydata.month = date.getMonth();
                currencydata.year = date.getFullYear();

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
    cronTime: '00 50 18 * * *',

    onTick: function(req, res) {
        // let p1, p2, p3;
        user.find((err, data) => {
            if (err) {
                res.status(403).send({ success: false, message: 'You are unauthorized' })
            } else {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].preferences[0].frequency == 'Daily') {
                        if (data[i].preferences[0].items[0].itemName == 'Nasdaq Stocks') {
                            //p1 = new Promise((resolve, reject) => {
                            let news = stockmodel.find({}).select('news');
                            news.exec(function(err, stockData) {
                                if (err) {
                                    console.log('error in stockmodel')
                                } else {
                                    let stock = stockData.map(ele => ele.news)
                                    //newsData.push("stock")
                                    //console.log(stock)
                                    //resolve(stock);
                                    //console.log('in else of stock')
                                    sendMails(data[i].email, stock)
                                }
                            })
                            //})

                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            //p2 = new Promise((resolve, reject) => {
                            let news = fundmodel.find({}).select('News')
                            news.exec(function(err, fundData) {
                                if (err) {
                                    console.log('error')
                                } else {
                                    let fund = fundData.map(ele => ele.News)
                                    //resolve(fund);
                                    //newsData.push("fund")
                                    //console.log('in else of fund')
                                    sendMails(data[i].email, fund)
                                }
                            })
                            //})

                        } else if (data[i].preferences[0].items[0].itemName == 'Currency') {
                            //p3 = new Promise((resolve, reject) => {
                            let news = currencymodel.find({}).select('News');
                            news.exec(function(err, currencyData) {
                                if (err) {
                                    console.log('error')
                                } else {
                                    let currency = currencyData.map(ele => ele.News)
                                    //  newsData.push("currency")
                                    //resolve(currency);
                                    //console.log(currencyData)
                                    sendMails(data[i].email, currency)
                                }
                            })
                            //})

                        }
                        //console.log(newsData)
                        //sendMails(data[i].email, newsData)
                    }

                    /*Promise.all([p1, p2, p3]).then(values => {
                        console.log(values)
                    })*/

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
                        if (data[i].preferences[0].items[1].itemName == 'Nasdaq Stocks') {
                            //p1 = new Promise((resolve, reject) => {
                            let news = stockmodel.find({}).select('news');
                            news.exec(function(err, stockData) {
                                if (err) {
                                    console.log('error in stockmodel')
                                } else {
                                    let stock = stockData.map(ele => ele.news)
                                    //newsData.push("stock")
                                    //console.log(stock)
                                    //resolve(stock);
                                    //console.log('in else of stock')
                                    sendMails(data[i].email, stock)
                                }
                            })
                            //})

                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            //p2 = new Promise((resolve, reject) => {
                            let news = fundmodel.find({}).select('News')
                            news.exec(function(err, fundData) {
                                if (err) {
                                    console.log('error')
                                } else {
                                    let fund = fundData.map(ele => ele.News)
                                    //resolve(fund);
                                    //newsData.push("fund")
                                    //console.log('in else of fund')
                                    sendMails(data[i].email, fund)
                                }
                            })
                            //})

                        } else if (data[i].preferences[0].items[2].itemName == 'Currency') {
                            //p3 = new Promise((resolve, reject) => {
                            let news = currencymodel.find({}).select('News');
                            news.exec(function(err, currencyData) {
                                if (err) {
                                    console.log('error')
                                } else {
                                    let currency = currencyData.map(ele => ele.News)
                                    //  newsData.push("currency")
                                    //resolve(currency);
                                    // console.log('in else of currency')
                                    sendMails(data[i].email, currency)
                                }
                            })
                            //})

                        }
                        //console.log(newsData)
                        //sendMails(data[i].email, newsData)
                    }

                    /*Promise.all([p1, p2, p3]).then(values => {
                        console.log(values)
                    })*/

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
                    if (data[i].preferences[0].frequency == 'Monthly') {
                        if (data[i].preferences[0].items[1].itemName == 'Nasdaq Stocks') {
                            //p1 = new Promise((resolve, reject) => {
                            let news = stockmodel.find({}).select('news');
                            news.exec(function(err, stockData) {
                                if (err) {
                                    console.log('error in stockmodel')
                                } else {
                                    let stock = stockData.map(ele => ele.news)
                                    //newsData.push("stock")
                                    //console.log(stock)
                                    //resolve(stock);
                                    //console.log('in else of stock')
                                    sendMails(data[i].email, stock)
                                }
                            })
                            //})

                        } else if (data[i].preferences[0].items[0].itemName == 'Funds') {
                            //p2 = new Promise((resolve, reject) => {
                            let news = fundmodel.find({}).select('News')
                            news.exec(function(err, fundData) {
                                if (err) {
                                    console.log('error')
                                } else {
                                    let fund = fundData.map(ele => ele.News)
                                    //resolve(fund);
                                    //newsData.push("fund")
                                    //console.log('in else of fund')
                                    sendMails(data[i].email, fund)
                                }
                            })
                            //})

                        } else if (data[i].preferences[0].items[2].itemName == 'Currency') {
                            //p3 = new Promise((resolve, reject) => {
                            let news = currencymodel.find({}).select('News');
                            news.exec(function(err, currencyData) {
                                if (err) {
                                    console.log('error')
                                } else {
                                    let currency = currencyData.map(ele => ele.News)
                                    //  newsData.push("currency")
                                    //resolve(currency);
                                    // console.log('in else of currency')
                                    sendMails(data[i].email, currency)
                                }
                            })
                            //})

                        }
                        //console.log(newsData)
                        //sendMails(data[i].email, newsData)
                    }

                    /*Promise.all([p1, p2, p3]).then(values => {
                        console.log(values)
                    })*/

                }
            }
        })
    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
monthlyMailJob.start();

function sendMails(emailId, fundsData) {

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
        html: `<ul>News</ul><br><li>
							${fundsData}
							</li>`

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
    cronTime: '00 30 14 * * *',
    onTick: function(req, res, next) {
        nasdaq.find((err, data) => {
            if (err) {
                console.log("error")
            } else {
                console.log('Sheduler start')
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