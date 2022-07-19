const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { append } = require('express/lib/response');
const verifyToken = require('./verifyToken');

//Submits a user
router.post('/signup', async (req,res) => {
    //Validate data (check if fields are correct... eg email is right/password more than 6 characters)
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message), console.log(error.details[0].message);

    //Check if email is already existing
    const emailExists = await User.findOne({email: req.body.email})
    if(emailExists) return res.status(404).send('That email already exists'), console.log(error.details[0].message);

    //Hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashedPassword,
        todos: []
    });
    try {
        const savedPost = await user.save();
        res.json(savedPost);
    } catch(err){
        res.json({message: err})
    }
});

//Login user
router.post('/login', async (req,res) => {
    //Validate data
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message), console.log(error.details[0].message);

    //Check if email is already existing
    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(404).send('Email/Password is wrong');

    //If password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');

    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    //res.header('auth-token', token).send(token);

    return res
        .cookie('auth-token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({message: "Successfully logged in!"});
    try{

    }catch(error){
        res.send(error);
    }
})

router.post('/logout', verifyToken, (req,res) => {
    return res
        .clearCookie('auth-token')
        .status(200)
        .json({message: 'Successfully logged out'});
})

router.get('/status', verifyToken, (req,res) => {
    res.send(true)
})

module.exports = router;