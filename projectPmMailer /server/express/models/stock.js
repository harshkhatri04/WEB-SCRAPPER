const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stockschema = new Schema({
    term: String,
    news: String,
   day:Number,
    month:Number,
    year:Number,
}, { collection: 'stock' });

var stockdata = mongoose.model('stock', stockschema);

module.exports = stockdata;

