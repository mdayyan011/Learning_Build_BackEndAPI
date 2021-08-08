const url = require('url');

const utility_obj = require('../helpers/utility.js');
const message_obj = require('../config/message.js');
const db_obj = require('../helpers/query.js')

exports.user_registration = function(req, res) {

  const name = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const password = req.body.password;

  if (utility_obj.checkEmpty(name)) {
    return res.send(message_obj.empty_name);

  }
  if (utility_obj.checkEmpty(mobile)) {
    return res.send(message_obj.empty_mobile);

  }
  if (utility_obj.checkEmpty(email)) {
    return res.send(message_obj.empty_email);

  }
  if (utility_obj.checkEmpty(password)) {
    return res.send(message_obj.empty_password);

  }


  if (utility_obj.checkMobileFormat(mobile)) {
    return res.send(message_obj.incorrect_mobile);

  }
  if (utility_obj.checkEmailFormat(email)) {
    return res.send(message_obj.incorrect_email);

  }

  if (utility_obj.checkPasswordFormat(password)) {
    return res.send(message_obj.incorrect_password);

  }
  db_obj.insertCustomerData(exports.customer_data = {
    customer_name: name,
    customer_mobile: mobile,
    customer_email: email,
    customer_password: utility_obj.encrypt(password)
  })
  return res.send(message_obj.registered);

}
exports.userLogin = function(req, res) {
  const mobile = req.body.mobile;
  const password = req.body.password;
  if (utility_obj.checkEmpty(mobile)) {
    return res.send(message_obj.enter_mobile);

  }
  if (utility_obj.checkEmpty(password)) {
    return res.send(message_obj.enter_password);

  }
  db_obj.LoginCustomer(exports.login_details = {
    customer_mobile: mobile,
    customer_password: utility_obj.encrypt(password)
  })
}

exports.getUserData =async function(req, res) {
  const user_id = req.headers.user_id;
  let rows =await db_obj.getUserData(user_id);
  console.log(rows,"Ayyan");
  res.send(rows);
}
