const express = require('express');
const router = express.Router();
const User = require('../models/User');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('./verifyToken');
const mongoose = require('mongoose');
const { db } = require('../models/User');

//Get todos
router.get('/', verifyToken, function(req,res){
    User.findOne({_id: req.user}, function (err, user) {
        res.send(user.todos);
    });
})

//Add todo
router.post('/', verifyToken, function(req,res){
    
    const todoToAdd = {
        title: req.body.title,
        desc: req.body.desc,
        completed: req.body.completed
    }

    console.log(todoToAdd);

    User.findOneAndUpdate({_id: req.user}, { $push: { todos: todoToAdd  } },
        function(err, succ){
            console.log(todoToAdd);
            if(err){
                res.status(401);
            }else{
                res.status(200);
                res.send('Todo added');
            }
        })
})

//Delete todo
router.post('/delete', verifyToken, async (req,res) => {

    const todoToDelete = req.body.todoToDelete._id;
    console.log(todoToDelete);

    User.findOneAndUpdate(
        {_id: req.user},
        { $pull: { 'todos': {_id: todoToDelete} } },
    function(err, result){
        if(err){
            res.send(err)
        } else {
            res.json(result)
        }
    }
    
    );

});

module.exports = router;