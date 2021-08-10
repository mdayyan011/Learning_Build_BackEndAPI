const express= require('express');
const app = express();
const bodyParser=require('body-parser');
const DataRouter=require("./routes/routes.js");
app.use(bodyParser.json());
// const message = require('./config/message.js')

const db = require('./helpers/query.js')

app.use('/',DataRouter);

app.listen('3000',function(req,res){
  console.log("Server started at port 3000");
})
