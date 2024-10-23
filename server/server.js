const express= require('express');
const bodyParser=require('body-parser');
const MasterRoute=require('./routes/master.routes');
const mongoConnect=require('./config/mongodb');
const app=express();
require('dotenv').config;
app.use(bodyParser.json());
port=process.env.PORT || 8000;
mongoConnect();

app.use('/api/v1', MasterRoute);


 

app.listen(port,()=>{

    console.log( `Server Running on Port : ${port}`)
});