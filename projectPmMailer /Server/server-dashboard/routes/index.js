var express = require('express');
let request = require('request');
let cheerio = require('cheerio');
var router = express.Router();
let nasdaq=require('../model/nasdaq');
const mongoose = require('mongoose');
const connect = mongoose.connect('mongodb://localhost:27017/testing');
/* GET home page. */
router.post('/', function(req, res, next) {
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

	      console.log(currency);
	      res.json({data:currency});
	  }
	})
});
router.get('/details',function(req,res,next){
nasdaq.find((err,data)=>{
	if(err){
		console.log("error")

	}
	else {
		res.json(data)
		console.log(data)
	}
})

})

module.exports = router;
