const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('../models/userModel')
const config = require('../config/database');
const configure = require('../config/configure');
const logger = require('../services/app.logger');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
    next();
});
//route to update name by the given email
//route starts here

router.put('/updateUser/:email',(req,res)=>{
  User.update({email:req.params.email},{ 
 		$set:{
 			name:req.body.name, // updating the name in database by name provided by user
      mobile:req.body.mobile,
      alternateEmail:req.body.alternateEmail
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
router.delete('/deleteUser/:email', (req, res) => {
		User.findOneAndRemove({
						email: req.params.email
				},
				(err, data) => {
						if (err) {
								res.send(err)
						} else {
								res.send('deleted successfully');
						}
				}
		);
});

// route to update password
// route starts here
router.post('/updatePassword/:email', (req, res) => {
						User.findOne({ email: req.params.email }, function(err, user) {
												if (err) {
														res.status(400).send({ status: false, message: 'error updating password' })
												} else {
														user.comparePassword(req.body.password, function(err, isMatch) {
																				if (isMatch && !err) {
																						user.password = req.body.newPassword;
																						user.save((err) => {
																												if (err) {
																														res.status(400).send({ success: false, message: 'could not update password' })
																												} else { res.status(200).send({ success: true, message: 'password updated successfully' })
																								}
																						})
																				} else {
																						res.status(400).send({ success: false, message: 'password mismatch' })
								}
						})
				}
		})
})

		router.put('/flag/:email', (req, res) => {
				req.body.flag=1;
				User.update({ email: req.params.email }, {

						$set: {
								flag: req.body.flag
						}
				}, (err, Data) => {
						/*console.log(JSON.stringify(Data))*/
						if (err) {
								console.log('error occured');
						} else {

								res.send(Data);
								//console.log(JSON.stringify(Data));
						}

				});
		});
// route ends here
module.exports = router;