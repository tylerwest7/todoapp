const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');

router.get('/', verifyToken, function(req,res){
    User.findOne({_id: req.user}, function (err, user) {
        res.send(user);
    });
})


module.exports = router;