const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
const nasdaqstock = new Schema({
    term: String,
    closeAt: String,
    Price: String,
    upDown: String,
    hours: String,
    hPrice: String,
    hupdown: String,

=======
const stockschema = new Schema({
    term: String,
    news: String
>>>>>>> 1d64f1c70e187b32b25c4e0b469e44613f1ffea8


}, { collection: 'stock' });

<<<<<<< HEAD
var stockdata = mongoose.model('stock', nasdaqstock);

//var user1 = new Users({ firstName: 'gaurav', lastName: 'gupta', age: 22 });

module.exports = stockdata;
=======
var stockdata = mongoose.model('stock', stockschema);

module.exports = stockdata;
>>>>>>> 1d64f1c70e187b32b25c4e0b469e44613f1ffea8
