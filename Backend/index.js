const express = require('express');
const cors = require('cors');
const app = require("./server").expressApp
const server = require("./server").httServer
const bodyparser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const imageupload=require('./routes/route');

//Route Imports


require('./database/dbconnect')

app.use(cors({
  origin:"*"
})); 


const PORT=process.env.PORT||3000;
app.use(cors({
  origin:"*"
})); 


app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())



app.use('/test', imageupload);




server.listen(PORT,(err)=>{
    if(!err){console.log("server started",PORT)}
    else{
      console.log(err)
    }
});