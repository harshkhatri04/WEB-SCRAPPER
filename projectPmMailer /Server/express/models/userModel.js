const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const titlize = require('mongoose-title-case');
const validate = require('mongoose-validator');

//name must have these characters a-z and A-Z
/*var nameValidator = [
  validate({
  validator: 'matches',
  arguments: /^[a-zA-Z]+$/,
  message:'Must contain only alphabets'
})
];*/

let UserSchema = new Schema({
	name : {type :String,required : true /*,validate: nameValidator*/},
	email :{ type: String, required:true , unique : true},
	mobile :{ type: Number, required:true},
	password : {type :String, required: true},
	resetPasswordToken: String,
  resetPasswordExpires: Date

    
	//active :{ type: Boolean , required:true,default: false},//becomes true only when user registers himself
	//temporaryToken:{ type: String, required: true}
});

UserSchema.pre('save',function(next){
	let user=this;
	bcrypt.hash(user.password,null,null,(err,hash)=>{
       if(err) console.log('error occurred line 14');
		user.password=hash;
		console.log(user.password)
		next();
	});
	
})

UserSchema.plugin(titlize, {
  paths: [ 'name' ]// Array of paths 
  
});

UserSchema.methods.comparePassword = function (passw, cb) {
   bcrypt.compare(passw, this.password, function (err, isMatch) {
       if (err) {
           return cb(err);
       }
       cb(null, isMatch);
   });
};

/*========reset pwd===========*/
/*passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});*/
/*========reset pwd===========*/
module.exports = mongoose.model('User',UserSchema); 


