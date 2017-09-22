const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TempUserSchema = new Schema({
	name : String,
	password : String,
	GENERATED_VERIFYING_URL: String
});

module.exports = mongoose.model('tempUser',TempUserSchema); 