const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/userModel')
const config = require('../config/database');
const configure = require('../config/configure');
const logger = require('../services/app.logger');



 router.put('/updateName/:email',(req,res)=>{
console.log(req.params.email);
console.log(req.body.name);
 	
 	User.update({email:req.params.email},{
 		$set:{
 			name:req.body.name
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

 router.put('/updateMobile/:email',(req,res)=>{

 	User.update({email:req.params.email},{

 		$set:{
 			mobile:req.body.mobile
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



module.exports = router;