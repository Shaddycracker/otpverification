const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const otpGenerator =require('../utils/otpGenerator');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
    user: process.env.EMAIL, // Your Gmail address
    pass: process.env.EMAIL_PASSWORD // The 16-character app-specific password you just created
  }
});



const createUser = async (req, res) => {

  try {
    // Ensure that 'password' comes from req.body
    const { username, password, email } = req.body;
    const otp=otpGenerator();
  
   
      
    if (!password) {
        return res.status(400).json({ message: 'Password is required', status: false });
    }
   


    // Hash the password with bcrypt
    const hashingPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    const user = await User.create({
      username,
      password: hashingPassword,
      email,
      verifiedStaus:false,
      otp:otp,
      otpExpire:Date.now()+300000

    });

    // If user is successfully created, return a success message
    if (user) {
      console.log(`User Created with ${email}`);
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Leet Sheet Otp Verification', 
        text: `Your otp is : ${otp}`, 

        
      };

      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error(' Mail issue ',error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      
      return res.status(201).json({ message: 'User registered successfully', status: true });
    }
  } catch (err) {
    // Handle errors properly
    console.log('Error:', err);
    return res.status(500).json({ message: 'Error creating user', status: false });
  }
};

module.exports = createUser;
