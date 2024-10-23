

const express=require('express');


const route=express.Router();

const createUser=require('../../controllers/createuser.controller');


route.route('/').post(createUser);



module.exports=route;