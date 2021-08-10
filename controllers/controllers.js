const url = require('url');
const utility_obj = require('../helpers/utility.js');
const message_obj = require('../config/message.js');
const db_obj = require('../helpers/query.js')


exports.user_registration =async function(req, res) {
  const name = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const password = req.body.password;
  const locality = req.body.locality;
  const pincode = req.body.pincode;
  const ps=req.body.ps;
  const district = req.body.district;
  const state = req.body.state;

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
  if (utility_obj.checkEmpty(locality)) {
    return res.send(message_obj.empty_locality);

  }
  if (utility_obj.checkEmpty(pincode)) {
    return res.send(message_obj.empty_pincode);

  }
  if (utility_obj.checkEmpty(ps)) {
    return res.send(message_obj.empty_ps);

  }
  if (utility_obj.checkEmpty(district)) {
    return res.send(message_obj.empty_district);

  }
  if (utility_obj.checkEmpty(state)) {
    return res.send(message_obj.empty_state);

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

 const count = await db_obj.countData();
 var database_id;
 if(count%2==0)
 {
   database_id="child_1";
 }
 else {
   database_id="child_2";
 }


 var db_child;
 if(database_id=='child_1')
 {
   db_child="child_db_1";
 }
 else {
   db_child='child_db_2';
 }
 let customer_details = {
   customer_id: (count+1),
   customer_name: name,
   customer_mobile: mobile,
   customer_email: email,
   customer_password: utility_obj.encrypt(password),
   database_id: database_id
 }

 let customer_address={
   customer_id: (count+1),
   customer_address_locality: locality,
   customer_address_pincode: pincode,
   customer_address_ps: ps,
   customer_address_district: district,
   customer_address_state:state
 }

 await db_obj.insertCustomerData(customer_details);
 await db_obj.insertCustomerAddress(customer_address,db_child);
 res.sendStatus(200);
}



exports.userLogin =async function(req, res) {
  const mobile = req.body.mobile;
  const password = req.body.password;
  if (utility_obj.checkEmpty(mobile)) {
    return res.send(message_obj.enter_mobile);
  }
  if (utility_obj.checkEmpty(password)) {
    return res.send(message_obj.enter_password);
  }
  const login_response = await db_obj.userLogin(mobile);
  const correct_encrypted_password=login_response.customer_password;
  const correct_decrypted_password=utility_obj.decrypt(correct_encrypted_password);

  if(password == correct_decrypted_password)
  {
    const encrypt_customer_id=utility_obj.encrypt(login_response.customer_id+"::++::");
    let response = {
      customer_id:encrypt_customer_id,
      customer_name:login_response.customer_name,
      database_id: login_response.database_id
    }
    return res.send(response);
  }
  else {
    return res.send(message_obj.getDataError);
  }
}
exports.getUserData =async function(req, res) {
  const encrypted_user_id = req.headers.user_id;
  const database_id=req.body.database_id;
  var database_child;
  const decrypter_user_id=utility_obj.decrypt(encrypted_user_id);
  const user_id=(decrypter_user_id.split("::++"))[0];
  if (utility_obj.checkEmpty(database_id)) {
    return res.send(message_obj.empty_database_id);
  }
  if(utility_obj.checkDatabaseFormat(database_id))
  {
    return res.send(message_obj.wrong_database_id);
  }


  if(user_id%2==1 && database_id=='child_1')
  {
    database_child="child_db_1";
  }
  else if(user_id%2==0 && database_id=='child_2')
  {
   database_child="child_db_2";
 }
 else {
   return res.send(message_obj.databaseCustomerIdError);
 }


  const rows =await db_obj.getUserData(user_id,database_child);
  if(utility_obj.checkEmpty(rows))
  {
    res.send(message_obj.databaseCustomerIdError)
  }
  else {

    res.send(rows);
  }
}
