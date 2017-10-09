let express = require('express');
let User = require('../models/userModel');
let router = express.Router();

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
        console.log(JSON.stringify(Data))
        if (err) {
            console.log('error occured');
        } else {

            res.send(Data);
        }

    });
});

module.exports = router;