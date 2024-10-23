const express=require('express');


const route=express.Router();

const UserCreationRoute= require('./Authentication/UserCreation.routes');
const otpverificationRoute = require('./Authentication/otpverification.routes');

route.use('/user', UserCreationRoute); // Prefix for user creation routes
route.use('/otp', otpverificationRoute); // Prefix for OTP verification routese


module.exports=route;