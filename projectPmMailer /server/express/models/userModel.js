const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
const titlize = require('mongoose-title-case');
const validate = require('mongoose-validator');


let UserSchema = new Schema({
  name : {type :String},
  email :{ type: String},
  mobile :{ type: Number},
  password : {type :String},
  resetPasswordToken: String,
  resetPasswordExpires: Date

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
module.exports = mongoose.model('User',UserSchema); 


