const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const currencyschema = new Schema({
    Time: String,
    Headline: String,
    News: String

}, { collection: 'currency' });

var currencymodel = mongoose.model('currency', currencyschema);

module.exports = currencymodel;