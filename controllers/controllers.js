const url = require('url');
const utility_obj = require('../helpers/utility.js');
const message_obj = require('../config/message.js');
const db_obj = require('../helpers/query.js');
const { response } = require('express');


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
  let response={};
  if (utility_obj.checkEmpty(name)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_name;
    return res.send(response);
  }
  if (utility_obj.checkEmpty(mobile)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_mobile;
    return res.send(response);
  }
  if (utility_obj.checkEmpty(email)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_email;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(password)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_password;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(locality)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_locality;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(pincode)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_pincode;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(ps)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_name;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(district)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_district;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(state)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_state;
    return res.send(response);

  }


  if (utility_obj.checkMobileFormat(mobile)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.incorrect_mobile;
    return res.send(response);

  }
  if (utility_obj.checkEmailFormat(email)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.incorrect_email;
    return res.send(response);
  }

  if (utility_obj.checkPasswordFormat(password)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.incorrect_password;
    return res.send(response);
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
  let response={};
  const mobile = req.body.mobile;
  const password = req.body.password;
  if (utility_obj.checkEmpty(mobile)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.enter_mobile;
    return res.send(response);
  }
  if (utility_obj.checkEmpty(password)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.enter_password;
    return res.send(response);
  }
  const login_response = await db_obj.userLogin(mobile);
  if(utility_obj.checkEmpty(login_response))
  {
    response={};
    response['status']='error';
    response['mssg']=message_obj.getDataError;
    return res.send(response);
  }
  const correct_mobile=login_response.mobile_nmbr;
  const correct_encrypted_password=login_response.customer_password;
  const correct_decrypted_password=utility_obj.decrypt(correct_encrypted_password);
  if(mobile != correct_mobile)
  {
    response={};
    response['status']='error';
    response['mssg']=message_obj.getDataError;
    return res.send(response);
  }
  if(password == correct_decrypted_password)
  {
    let customer_id = login_response.customer_id;
    let database_id= login_response.database_id;
    let user_id_decrypt="";
    user_id_decrypt=customer_id+":::"+database_id;
    let user_id=utility_obj.encrypt(user_id_decrypt);
    let customer_name = login_response.customer_name;
    response={};
    response['user_id']=user_id;
    response['customer_name']=customer_name;
    return res.send(response);
  }
  else {
    response={};
    response['status']='error';
    response['mssg']=message_obj.getDataError;
    return res.send(response);
  }
}
exports.getUserData =async function(req, res) {
  let user_id_encrypt=req.headers.user_id;
  let user_id=utility_obj.decrypt(user_id_encrypt);
  let customer_id=user_id.split(":::")[0];
  let database_id=user_id.split(":::")[1];
  // const user_id = req.headers.user_id;
  // const database_id=req.body.database_id;
  var database_child;

  let response={};
  if (utility_obj.checkEmpty(database_id)) {
    response={};
    response['status']='error';
    response['mssg']=message_obj.empty_database_id;
    return res.send(response);
  }
  if(utility_obj.checkDatabaseFormat(database_id))
  {
    response={};
    response['status']='error';
    response['mssg']=message_obj.wrong_database_id;
    return res.send(response);
  }


  if(customer_id%2==1 && database_id=='child_1')
  {
    database_child="child_db_1";
  }
  else if(customer_id%2==0 && database_id=='child_2')
  {
   database_child="child_db_2";
 }
 else {
   response={};
   response['status']='error';
   response['mssg']=message_obj.databaseCustomerIdError;
   return res.send(response);
 }
 
  const rows =await db_obj.getUserData(customer_id,database_child);
  if(utility_obj.checkEmpty(rows))
  {
    response={};
    response['status']='error';
    response['mssg']=message_obj.databaseCustomerIdError;
    res.send(response)
  }
  else {
    
    res.send(rows);
  }
}
