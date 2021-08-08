var Promise = require('bluebird'),
  mysql = require('mysql2'),
  using = Promise.using;


var dbs = require('../helpers/utility.js');
var constants =require('../config/message.js');
var utility = require("../helpers/utility.js");


var pools = {};
var base = {

  host: 'localhost',
  user: 'root',
  password: 'password',
  database: undefined,
  connectionLimit: 100,
  multipleStatements: true,
  dateStrings: true,
  //acquireTimeout: 30000,
  typeCast: function (field, next) {
    if (field.type == "BIT" && field.length == 1) {
      var bit = field.string();
      return (bit === null) ? null : bit.charCodeAt(0);
    }
    return next();
  }
};

exports.connection = async () => new Promise(
  (resolve, reject) => {

    Object.keys(dbs).forEach(function (d) {
      var o = Object.assign({}, base);
      Object.keys(dbs[d]).forEach(function (k) {
        o[k] = dbs[d][k];
      });
      pools[d] = mysql.createPool(o);
    });
    constants.vals.dbconnpool = {};
    resolve(pools);
  });

exports.query = async (database, q, params) => new Promise(
  (resolve, reject) => {


    const handler = (error, result) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(result);
    }


    constants.vals.dbconn[database].getConnection(function (err, connection) {
      if (err) {
        console.error('runQry-cannot getConnection ERROR:', err);
        return callback(err);
      }
      connection.query(q, params, function (err, result) {
        connection.release();
        if (err) {
          console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
          console.log(mysql.format(q, params));
          console.log('------------------------------------------------------------------------------------------------');
          console.error('runQry-cannot run qry ERROR:', err);
          reject(err);
        }

        resolve(result);
      });
    });



    //   var con = mysql.createConnection(constants.vals.dbconn[database]);
    //   console.log("Connected!",database);
    //    con.query(q, params, handler);
    //     con.connect(function(err) {
    //     if (err) throw err;
    //     console.log("Connected!",database);

    //     });









    //     console.log('++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    //   console.log(mysql.format(q, params));
    //   console.log('------------------------------------------------------------------------------------------------');

  });
