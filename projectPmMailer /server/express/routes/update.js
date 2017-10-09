const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/userModel')
const config = require('../config/database');
const configure = require('../config/configure');
const logger = require('../services/app.logger');

//route to update name by the given email
//route starts here
router.put('/updateName/:email',(req,res)=>{
  User.update({email:req.params.email},{ 
 		$set:{
 			name:req.body.name // updating the name in database by name provided by user
 		}
 	},(err, result) => {
    if (err) {
    	res.send(err)
    }else{
    	res.send(result)
    }
     }
  );
 });
//route ends here

//route to update mobile number by the given email
//route starts here
 router.put('/updateMobile/:email',(req,res)=>{
  User.update({email:req.params.email},{
    $set:{
 			mobile:req.body.mobile // updating the mobile number in the database by mobile number provided by user
 		}
 	},(err, result) => {
    if (err) {
    	 res.send(err)
    }else{
    	res.send(result)
    }
   }
  );
 });
//route ends here

//route to add alternate email id
//route starts here
 router.put('/addAlternateEmail/:email',(req,res)=>{
  User.update({email:req.params.email},{
    $set:{
     alternateEmail:req.body.alternateEmail // adding alternate email id provided by user
    }
  },(err, result) => {
    if (err) {
       res.send(err)
    }else{
      res.send(result)
    }
   }
  );
 });
//route ends here

//route to delete user account
//route starts here
router.delete('/deleteUser/:email',(req,res)=>{
	User.findOneAndRemove({
		email:req.params.email
	},
	(err,data)=>{
		if(err) {
			res.send(err)
		}
			else{
				res.send('deleted successfully');
			}
	}
	);
});
//route ends here

module.exports = router;