const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const auth = require('./routes/auth');
const home = require('./routes/home');
const users = require('./routes/users');
const todos = require('./routes/todos');
const cookieParser = require('cookie-parser');
require("dotenv/config");

//Body Parser
app.use(bodyParser.json())
app.use(cookieParser());

//Connect to Mongo
mongoose.connect(process.env.DB_CONNECTION, () => 
    console.log('Connected'),
)

//Use routes
app.use('/auth', auth);
app.use('/home', home);
app.use('/userlist', users);
app.use('/todos', todos);

app.get('/', function (req, res) {
    res.send('Main page');
});

//Handle 404
app.use(function (req, res, next) {
    res.status(404).send("Sorry can't find that!")
});

//Define port
var port = process.env.PORT || 9000;

//Listen to port
app.listen(port);