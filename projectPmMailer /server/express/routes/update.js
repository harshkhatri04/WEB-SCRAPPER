const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const User = require('../models/userModel')
const config = require('../config/database');
const configure = require('../config/configure');
const logger = require('../services/app.logger');
//route to update name by the given email
//route starts here
router.put('/updateName/:email', (req, res) => {
    User.update({ _email: req.params.email }, {
        $set: {
            name: req.body.name // updating the name in database by name provided by user
        }
    }, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
            logger.info("updating name by given email")
        }
    });
});
//route ends here
//route to update name by the given email
//route starts here

router.put('/updateUser/:email', (req, res) => {
    User.update({ email: req.params.email }, {
        $set: {
            name: req.body.name, // updating the name in database by name provided by user
            mobile: req.body.mobile,
            alternateEmail: req.body.alternateEmail
        }
    }, (err, result) => {
        if (err) {
            res.send(err)
        } else {
            res.send(result)
        }
    });
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
                logger.info("user account deleted successfully")
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
            user.comparePassword(req.body.currentPwd, function(err, isMatch) {
                if (isMatch && !err) {
                    user.password = req.body.newPwd;
                    user.save((err) => {
                        if (err) {
                            logger.error("could not update password")
                            res.status(400).send({ success: false, message: 'could not update password' })
                        } else {
                            logger.success("password updated successfully")
                            res.status(200).send({ success: true, message: 'password updated successfully' })
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
    req.body.flag = 1;
    User.update({ email: req.params.email }, {

        $set: {
            flag: req.body.flag
        }
    }, (err, Data) => {

        if (err) {
            logger.error('error occured');
        } else {

            res.send(Data);
        }

    });
});
// route ends here
module.exports = router;