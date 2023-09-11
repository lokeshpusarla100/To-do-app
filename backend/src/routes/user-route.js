require('dotenv').config();
const jwt = require('jsonwebtoken')
const express  = require('express');
const UserModel = require('../models/register');
const { hashSync, compareSync } = require('bcrypt');
const router = express.Router();
const key = process.env.secret_key;
router.post('/register',async (req,res) => {


    const existinguser = await UserModel.findOne({email:req.body.email});

    if(existinguser){
        return res.status(400).json({
            success:false,
            message:"email already exists."
        })
    }

    let user = new UserModel({
        email:req.body.email,
        name:req.body.name,
        phone:req.body.phone,
        password:hashSync(req.body.password,10)
    })

    try {
        const savedUser = await user.save()
        if(savedUser){
            res.send({
                success:true,
                message:"user regestiration successful.",
                user:{
                    email:savedUser.email,
                    id:savedUser._id
                }
            })
        }
    } catch (error) {
        res.send({
            successs:false,
            message:"something went wrong.",
            error:error
        })
        
    } 
})


router.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    UserModel.findOne({ email })
      .then((user) => {
        if (!user) {
          return res.send({
            success: false,
            message: "Email not found.",
          });
        }
  
        if (!compareSync(password, user.password)) {
          return res.send({
            success: false,
            message: "Wrong password.",
          });
        }
  
        const payload = {
          email: user.email,
          id: user._id,
        };
  
        const token = jwt.sign(payload, key, { expiresIn: "1d" });
  
        res.json({
          success: true,
          message: "Login success.",
          token: "Bearer " + token,
        });
      })
      .catch((error) => {
        console.error(error);
        res.send({
          success: false,
          message: "Internal Server Error.",
          error:error
        });
      });
  });
  




module.exports = router;