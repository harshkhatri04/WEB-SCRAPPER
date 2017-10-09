// var express = require('express');
// var router = express.Router();
// var Twit = require('twit');
// var config = require('../config/tweetconfig');

// var T = new Twit(config.twitter)

// //  filter the twitter public stream by the word 'mango'.
// //
// // var india = [68.11,6.55,97.4,35.67];

// router.get('/hashtag', function(req,res){

// 	params ={
// 		track:'india',
// 		language:'en'
// 	}
// var stream = T.stream('statuses/filter', params.track)

// stream.on('tweet', function(tweet) {
//     console.log(tweet.text, tweet.created_at);
// })
// setTimeout(() => stream.stop(), 60000)
// })
// module.exports = router;