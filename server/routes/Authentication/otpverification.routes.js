const express=require('express');


const route=express.Router();

const otpverify=require('../../controllers/otpverify.controller');


route.route('/').post(otpverify);





module.exports=route;