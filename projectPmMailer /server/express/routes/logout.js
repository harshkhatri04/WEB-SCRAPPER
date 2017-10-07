const express = require('express');
const router = express.Router();

//route for logout
    router.get('/logout', function(req, res) {
        req.session.destroy();
        res.status(200).send("logout success!");
        logger.info("successfully logged out")
    });

    module.exports = router;