const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nasdaqschema = new Schema({

    Code: String,
    Company: String,

}, { collection: 'nasdaq' });

var nasdaqdata = mongoose.model('nasdaq', nasdaqschema);

module.exports = nasdaqdata;