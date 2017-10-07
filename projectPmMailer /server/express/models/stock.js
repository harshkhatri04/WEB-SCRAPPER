const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nasdaqstock = new Schema({
    term: String,
    closeAt: String,
    Price: String,
    upDown: String,
    hours: String,
    hPrice: String,
    hupdown: String,



}, { collection: 'stock' });

var stockdata = mongoose.model('stock', nasdaqstock);

//var user1 = new Users({ firstName: 'gaurav', lastName: 'gupta', age: 22 });

module.exports = stockdata;
