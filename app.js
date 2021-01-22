const express = require('express');

//function in exported
const todoController = require('./controllers/todoController');
const app = express();

let port = 3000;
let localHost = '127.0.0.1';

//set up the template engine
app.set('view engine', 'ejs');

//to deal with static files
app.use(express.static(__dirname + '/public'));

//fire controllers
todoController(app);

//listening app.js
app.listen(port, localHost, () => {
    console.log(`App Working At Port ${port}.`);
});