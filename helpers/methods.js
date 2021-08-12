const db_obj = require('../helpers/query.js');
exports.getUserData =async function(customer_id,database_id){
  let customer_data={};
  let customer_details=await db_obj.getUserDetails(customer_id);
  let customer_address=await db_obj.getUserAddress(customer_id,database_id);
  customer_data['name']=customer_details[0].customer_name;
  customer_data['mobile']=customer_details[0].customer_mobile;
  customer_data['email']=customer_details[0].customer_email;
  customer_data['locality']=customer_address[0].customer_address_locality;
  customer_data['pincode']=customer_address[0].customer_address_pincode;
  customer_data['ps']=customer_address[0].customer_address_ps;
  customer_data['district']=customer_address[0].customer_address_district;
  customer_data['state']=customer_address[0].customer_address_state;
  return customer_data;
}
