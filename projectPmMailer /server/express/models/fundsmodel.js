const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fundschema = new Schema({
    Time: String,
    Headline: String,
    News: String,
    day:Number,
    month:Number,
    year:Number,
}, { collection: 'fund' });

var fundmodel = mongoose.model('fund', fundschema);

module.exports = fundmodel;