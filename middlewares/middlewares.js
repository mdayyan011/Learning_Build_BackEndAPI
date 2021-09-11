const url = require('url');
const express = require('express');
const utility_obj = require('../helpers/utility.js');
const message_obj = require('../config/message.js');
const constants = require('../config/constant.js');
const dbcon =require('../config/connection_pool.js');
const controllers_obj = require('../controllers/controllers.js');

var Router = express.Router();

Router.use(async function(req, res, next) {

   if (utility_obj.checkEmpty(constants.dbconn)) {
    constants.dbconn = await dbcon.connection().catch(e => {
      console.log(e);
    })
  } 

  const user_id = req.headers.user_id;
  const url_link = url.parse(req.url, true);
  const path = url_link.pathname;
  let response={};
  if (utility_obj.checkEmpty(user_id)) {
    if (path === "/register" || path === "/login") {
      next();
    } else {
      response['status']='error';
      response['mssg']=message_obj.register_first;
      res.send(response);
      return;
    }
  }
   else {
    next();
  }
})
module.exports = Router;
