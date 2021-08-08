const mysql = require('mysql2');
const message_obj = require('../config/message.js');
const customer_data = require('../controllers/controllers.js');
const utility_obj = require('../helpers/utility.js');
const url = require('url');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'master_customer'
});

connection.connect(function(err) {
  if (err) {
    console.log(message_obj.error);
    console.log(err);
  }
  console.log(message_obj.db_success);
});

exports.insertCustomerData = function(customer_data) {
  const sql = `INSERT INTO customer_details SET ?`;
  connection.query(sql, [customer_data], function(err, rows) {
    if (err) throw err;
    else {
      console.log(message_obj.registerd);
    }
  })
}



exports.LoginCustomer = function(login_details) {
  const mobile = login_details.mobile;
  const password = login_details.password;
  const incoming_password = utility_obj.decrypt(password);
  const sql = 'SELECT * FROM customer_details WHERE customer_mobile=?';
  connection.query(sql, [mobile], function(err, rows) {
    if (err) throw err;
    else {
      const encrypted_password = rows[0].customer_password;
      const correct_password = utility_obj.decrypt(encrypted_password);
      if (incoming_password === correct_password) {
        console.log(message_obj.logedIn);
      } else {
        console.log(message_obj.logInError);
      }
    }
  })
}


exports.getUserData =async function(user_id) {
  await connection.query('SELECT * FROM customer_details WHERE customer_id=?', [user_id],
  async function(err, rows) {
    if (err) throw err;
    else {
      console.log(rows);
      return rows;
    }
  })
}


// let myPromise = new Promise(function(myResolve, myReject) {
// // "Producing Code" (May take some time)
//
//   myResolve(); // when successful
//   myReject();  // when error
// });
//
// // "Consuming Code" (Must wait for a fulfilled Promise)
// myPromise.then(
//   function(value) { /* code if successful */ },
//   function(error) { /* code if some error */ }
// );
