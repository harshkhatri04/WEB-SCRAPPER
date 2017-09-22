const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nasdaqsch = new Schema({

Code:String,
Company:String,

},{collection:'nasdaq'});

var Weather = mongoose.model('nasdaq', nasdaqsch);

//var user1 = new Users({ firstName: 'gaurav', lastName: 'gupta', age: 22 });

module.exports = Weather;
