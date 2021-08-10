const encryptionKey=require('../config/constant.js');
const crypto=require('crypto-js')

exports.checkEmpty =function(data)
{
  if (typeof data == 'object') {
		for (key in data) {
			if (Object.hasOwnProperty.bind(data)(key)) {
				return false;
			}
		}
		return true;
	}
  if( data==" " ||  data == undefined ||data.length===0|| data== null || !data )
  return true;
  else
  return false;
}


exports.checkMobileFormat = function(mobile) {
  if (mobile.length != 10)
    return true;
  else
    return false;
}

exports.checkEmailFormat = function(email) {
  const email_reg_exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!email_reg_exp.test(email))
    return true;
  else
    return false;
}

exports.checkPasswordFormat = function(password) {

  const password_reg_exp = /^(?=.*\d)(?=.*[!@#$%^&*~])(?=.*[a-z]{2})(?=.*[A-Z]{2}).{8,}$/;
  if (!password_reg_exp.test(password))
    return true;
  else
    return false;
}
exports.checkDatabaseFormat=function(database_id)
{ 
  if(database_id!="child_1" && database_id!="child_2")
  return true;
  else
  return false;
}
exports.encrypt = function(password)
{
  var encrypted_password=crypto.AES.encrypt(password,encryptionKey.passwordEncryptionKey).toString();
  return encrypted_password;
}
exports.decrypt = function(password)
{
  var decrypt_password = crypto.AES.decrypt(password, encryptionKey.passwordEncryptionKey);
  var original_password = decrypt_password.toString(crypto.enc.Utf8);
  return original_password;
}
