const express = require('express');
const middlewares_obj = require('../middlewares/middlewares.js');
const controllers_obj = require('../controllers/controllers.js');

var app = express();
app.use(middlewares_obj);

app.use('/register', controllers_obj.user_registration);
app.use('/login', controllers_obj.userLogin);
app.use('/getUserData', controllers_obj.getUserData);

module.exports = app;
