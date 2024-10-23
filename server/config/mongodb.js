const mongoose=require('mongoose');
require('dotenv').config();

const mongoConnect= async ()=>{

    try{



         await mongoose.connect(process.env.MONGO_URL)
    
         console.log('MongoDB connected successfully');

    }
    catch(err){

        console.error('MongoDB connection failed:', error.message);
        process.exit(1);

    }

}


module.exports=mongoConnect;