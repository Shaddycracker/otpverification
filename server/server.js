const express= require('express');


const app=express();
require('dotenv');
port=process.env.PORT || 8000;

app.get('/',(req,res)=>{
     res.send("working Server")
})


 

app.listen(port,()=>{

    console.log( `Server Running on Port : ${port}`)
});