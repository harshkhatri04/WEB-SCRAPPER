let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let connect = mongoose.connect('mongodb://192.168.252.47:27017/testing');
let currencymodel = require('../models/currencymodel')
let stockmodel = require('../models/stock')
let nasdaq = require('../models/nasdaq');
let request = require('request');
let CronJob = require('cron').CronJob;
let cheerio = require('cheerio');
<<<<<<< HEAD
const CronJob =require('cron').CronJob;
const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://192.168.252.47:27017/testing');
/*const connect = mongoose.connect('mongodb://localhost/testing');*/
const passportGoogle = require('../auth/google');
const configuration = require('./../config/googleAuth');
const passportFacebook = require('../auth/facebook');

module.exports = function(router) {
    // signup url
    router.post('/users', (req, res) => {
        let user = new User();
        user.name = req.body.name;
        user.password = req.body.password;
        user.email = req.body.email;
        user.mobile = req.body.mobile;
        // checking if fields are empty or not
        if (req.body.name == null || req.body.password == null || req.body.email == null || req.body.mobile == null) {
            res.json({ success: false, message: 'Ensure all the fields are filled' });
        } else {

            user.save((err) => {
                // return name of error in case of error
                if (err) {

                    if (err.errors.name) {
                        res.json({ success: false, message: err.errors.name.message });
                    }
=======
let fundmodel = require('../models/fundsmodel')

//HTTP Post method end
>>>>>>> 1d64f1c70e187b32b25c4e0b469e44613f1ffea8

//HTTP Get method start 
router.get('/details', function(req, res, next) {
    nasdaq.find((err, data) => {
        if (err) {
            console.log("error")

        } else {
            res.json(data)
            console.log(data)
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

            console.log(stock);
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
                            console.log('success', data);
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
                        console.log("sucess", data)
                    }

<<<<<<< HEAD
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
=======
                })
            });
>>>>>>> 1d64f1c70e187b32b25c4e0b469e44613f1ffea8

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
                        console.log("sucess", data)
                    }

                })

            });
        }
    })
}

<<<<<<< HEAD

    var job=new CronJob({
        cronTime:'* * * * *',
        onTick:function(req, res, next) {
        nasdaq.find((err, data) => {
            if (err) {
                console.log("error")

            } else {
                // res.json(data)
                // getnasdaq(data.Code);
                // console.log(data);
                getnasdaq(data)

            }
        })

    },start:false,
    timeZone:'Asia/Kolkata'

        }
    );
    job.start();


 function getnasdaq(data) {
  
   for(let i=0;i<data.length;i++){
    term=data[i].Code;
    news(term);
   }
   function news(term) {
        
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
                        term:term,
                        closeAt: close,
                        Price: price,
                        upDown: updown,
                        hours: hours,
                        hPrice: hPrice,
                        hupdown: hupdown,

                    }
                    stock.push(metadata1);
                });
                    res.json({data:stock});
                
                // res.json({ data: stock });
            }
        })
    }


}
    //HTTP Post method for stock price of NASDAQ for WSJ website
=======
>>>>>>> 1d64f1c70e187b32b25c4e0b469e44613f1ffea8

/*This the cron job function to do scheduling on the nasdaq data*/
var job = new CronJob({
    /*format is second, minute, hour, day of month, months, day of week*/
    cronTime: '00 39 18 * * *',
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
<<<<<<< HEAD
    );
    /* GOOGLE ROUTER Ends */
    /* FACEBOOK ROUTER */
    router.get('/auth/facebook',
        passportFacebook.authenticate('facebook'));

    router.get('/auth/facebook/callback',
        passportFacebook.authenticate('facebook', { failureRedirect: 'http://localhost:4200/login' }),
        function(req, res) {
            // Successful authentication, redirect home.
            res.redirect('http://localhost:4200/dashboard');
        });



    return router;
}
=======

    },
    start: false,
    timeZone: 'Asia/Kolkata'

});
job.start();
//HTTP Post method for stock price of NASDAQ for WSJ website
module.exports = router;
>>>>>>> 1d64f1c70e187b32b25c4e0b469e44613f1ffea8
