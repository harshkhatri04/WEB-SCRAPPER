let express = require('express');
let User = require('../models/userModel');
let router = express.Router();
let logger = require('../services/app.logger');

router.put('/investment/:email', (req, res) => {

    let obj = {
        items: req.body.items,
        frequency: req.body.frequency
    }
    User.findOneAndUpdate({ email: req.params.email }, {

        $set: {
            preferences: [obj]
        }
    }, (err, Data) => {
        /*console.log(JSON.stringify(Data))*/
        if (err) {
            logger.error("error occured");

        } else {
            logger.info("preferences set successfully")
            res.send(Data);
            // console.log(JSON.stringify(Data));
        }

    });
});

module.exports = router;