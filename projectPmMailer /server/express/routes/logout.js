const express = require('express');
const router = express.Router();
const logger = require('../services/app.logger');

//route for logout
    router.get('/logout', function(req, res) {
        req.session.destroy();
        res.status(200).send("logout success!");
        logger.info("successfully logged out")
    });

    module.exports = router;