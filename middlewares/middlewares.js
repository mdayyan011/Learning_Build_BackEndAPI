const url = require('url');
const express=require('express');
const utility_obj = require('../helpers/utility.js');
const message_obj = require('../config/message.js');
const controllers_obj = require('../controllers/controllers.js');
var router = express.Router();

router.use(async function(req, res, next) {

    const user_id = req.headers.user_id;
    const url_link = url.parse(req.url, true);
    const path = url_link.pathname;
    if (utility_obj.checkEmpty(user_id)) {
      if (path === "/register" || path === "/login") {
        next();
      } else {
        res.send(message_obj.register_first);
        return;
      }
    } else {
      next();
    }
})
module.exports=router;
