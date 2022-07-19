const express = require('express');
const verify = require('./verifyToken');
const router = express.Router();

router.get('/', verify, (req,res,) => {
    
    const secretMessage = {
        "user": req.user,
        "message": "Hello from home page"
    }

    res.send(secretMessage);
})

module.exports = router;