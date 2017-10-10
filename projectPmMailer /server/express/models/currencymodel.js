const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencyschema = new Schema({
    Time: String,
    Headline: String,
    News: String,
    day:Number,
    month:Number,
    year:Number,

}, { collection: 'currency' });

var currencymodel = mongoose.model('currency', currencyschema);

module.exports = currencymodel;