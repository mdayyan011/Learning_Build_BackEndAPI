const url = require('url');
const express = require('express');
const utility_obj = require('../helpers/utility.js');
const message_obj = require('../config/message.js');
const constants = require('../config/constant.js');
const dbcon = require('../config/connection_pool.js');
const controllers_obj = require('../controllers/controllers.js');
const query = require('../helpers/query.js');

var Router = express.Router();


Router.use(async function(req, res, next) {

  if (utility_obj.checkEmpty(constants.dbconn)) {
    constants.dbconn = await dbcon.connection().catch(e => {
      console.log(e);
    })
  }
  req.locals = {};
  let response = {};
  response['status'] = 'error';

  const user_id = req.headers.user_id;
  const url_link = url.parse(req.url, true);
  const path = url_link.pathname;

  if (utility_obj.checkEmpty(user_id)) {
    if (path === "/register" || path === "/login") {
      next();
    } else { 
      response['message'] = message_obj.register_first;
      return (response);
    }
  } else {

    const encrypted_user_database_id = user_id;
    var decrypted_user_database_id = "";

    try {
      decrypted_user_database_id = utility_obj.decrypt(encrypted_user_database_id);
    } catch (e) {
      response['message'] = message_obj.databaseCustomerIdError;
      return response;
    }
    const decrypted_array = decrypted_user_database_id.split("::++::");
    req.locals.customer_id = decrypted_array[0];
    req.locals.database_id = decrypted_array[1];
    console.log(req.locals.customer_id);
    console.log(req.locals.database_id);
    if (utility_obj.checkEmpty(req.locals.customer_id)) {
      response['message'] = message_obj.empty_customer_id;
      res.send(response);
    }
    if (utility_obj.checkEmpty(req.locals.database_id)) {
      response['message'] = message_obj.empty_database_id;
      res.send(response);
    }
    const userData = await query.checkUserId(req.locals.customer_id, req.locals.database_id)
    if (utility_obj.checkEmpty(userData)) {
      response['message'] = message_obj.databaseCustomerIdError;
      return response;
    }
    next();
  }
})
module.exports = Router;
