const url = require('url');
const utility_obj = require('../helpers/utility.js');
const message_obj = require('../config/message.js');
const db_obj = require('../helpers/query.js');
const constants=require('../config/constant.js');
const methods=require('../helpers/methods.js');

exports.user_registration =async function(req, res) {
  let response={};
  const name = req.body.name;
  const mobile = req.body.mobile;
  const email = req.body.email;
  const password = req.body.password;
  const locality = req.body.locality;
  const pincode = req.body.pincode;
  const ps=req.body.ps;
  const district = req.body.district;
  const state = req.body.state;
  response['status']='error';
  if (utility_obj.checkEmpty(name)) {
    response['message']=message_obj.empty_name;
    return res.send(response);
  }
  if (utility_obj.checkEmpty(mobile)) {
    response['message']=message_obj.empty_mobile;
    return res.send(response);
  }
  if (utility_obj.checkEmpty(email)) {
    response['message']=message_obj.empty_email;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(password)) {
    response['message']=message_obj.empty_password;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(locality)) {
    response['message']=message_obj.empty_locality;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(pincode)) {
    response['message']=message_obj.empty_pincode;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(ps)) {
    response['message']=message_obj.empty_ps;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(district)) {
    response['message']=message_obj.empty_district;
    return res.send(response);

  }
  if (utility_obj.checkEmpty(state)) {
    response['message']=message_obj.empty_state;
    return res.send(response);
  }


  if (utility_obj.checkMobileFormat(mobile)) {
    response['message']=message_obj.incorrect_mobile;
    return res.send(response);

  }
  if (utility_obj.checkEmailFormat(email)) {
    response['message']=message_obj.incorrect_email;
    return res.send(response);
  }

  if (utility_obj.checkPasswordFormat(password)) {
    response['message']=message_obj.incorrect_password;
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
   db_child=constants.child_database1;
 }
 else {
   db_child=constants.child_database2;
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

 let insert_details_result=await db_obj.insertCustomerData(customer_details);
 let insert_adress_result = await db_obj.insertCustomerAddress(customer_address,db_child);
 response['status']='success';
 response['message']=message_obj.registered;
 return  res.send(response);

}

exports.userLogin =async function(req, res) {
  let response_login={};
  response_login['status']='error';
  const mobile = req.body.mobile;
  const password = req.body.password;
  if (utility_obj.checkEmpty(mobile)) {
    response_login['message']=message_obj.enter_mobile;
    return res.send(response_login);
  }
  if (utility_obj.checkEmpty(password)) {
    response_login['message']=message_obj.enter_password;
    return res.send(response_login);
  }
  const login_response = await db_obj.userLogin(mobile);
  const correct_encrypted_password=login_response.customer_password;
  const correct_decrypted_password=utility_obj.decrypt(correct_encrypted_password);

  if(password == correct_decrypted_password)
  {

    const encrypt_customer_id=utility_obj.encrypt(login_response.customer_id+"::++::"+login_response.database_id);

    let response = {
      customer_id:encrypt_customer_id,
      customer_name:login_response.customer_name
    }
    return res.send(response);
  }
  else {
    response_login['message']=message_obj.getDataError;
    return res.send(response_login);
  }
}


exports.getUserData =async function(req, res) {
  var database_id;
  let response={};
  response['status']="success";
  if(req.locals.database_id=="child_1")
  {
    database_id=constants.child_database1;
  }
  else {
    database_id=constants.child_database2;
  }
  let rows =await methods.getUserData(req.locals.customer_id,database_id);
  if(utility_obj.checkEmpty(rows))
  {
    response['status']="error";
    response['message']=message_obj.something_went_wrong;
    return res.send(response);
  }
  return  res.send(rows);
  console.log("Check Controller");
}
