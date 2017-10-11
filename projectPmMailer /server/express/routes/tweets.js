var express = require('express');
var router = express.Router();
var Twit = require('twit');
var config = require('../config/tweetconfig');

// instantiate Twit module
var twitter = new Twit(config.twitter);
const logger = require('../services/app.logger');

var TWEET_COUNT = 25;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline';
const logger = require('../services/app.logger');

/**
 * GET tweets json.
 */
router.get('/user_timeline/:user', function(req, res) {

    var oembedTweets = [],
        tweets = [],

        params = {
            screen_name: req.params.user, // the user id passed in as part of the route
            count: TWEET_COUNT, // how many tweets to return

        };

    // the max_id is passed in via a query string param
    if (req.query.max_id) {
        params.max_id = req.query.max_id;
    }

    // request data 
    twitter.get(USER_TIMELINE_URL, params, function(err, data, resp) {

        tweets = data;

        var i = 0,
            len = tweets.length;

        for (i; i < len; i++) {
            getOEmbed(tweets[i]);
        }
    });

    /**
     * requests the oEmbed html
     */
    function getOEmbed(tweet) {

        // oEmbed request params
        var params = {
            "id": tweet.id_str,
            "maxwidth": MAX_WIDTH,
            "hide_thread": true,
            "omit_script": true
        };

        // request data 
        twitter.post(OEMBED_URL, params, function(err, data, resp) {
            tweet.filter = data;
            oembedTweets.push(tweet);
            logger.info("twitter data")

            // do we have oEmbed HTML for all Tweets?
            if (oembedTweets.length == tweets.length) {
                res.setHeader('Content-Type', 'application/json');
                res.send(oembedTweets);

            }
        });
    }
});

module.exports = router;