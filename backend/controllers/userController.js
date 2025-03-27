import userModel from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import bycrypt from 'bcrypt';
import validator from 'validator';
import createToken from "../config/jwt.js";
//login user

const loginUser = async (req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User doesnot exist"
            })
        }
        const isMatched = await bycrypt.compare(password, user.password)

        if(!isMatched){
            return res.status(403).json({
                succes: false,
                message: "Invalid credentials"
            
            })
        }
        const token = createToken(user._id);
        res.status(200).json({
            success: true,
            token
        })
    }catch(err){
        console.log(err)
        res.json({
            success: false,
            message: "Something went wrong"
        })
    }
}

//registeer user

const registerUser = async (req,res)=>{
    const {name,email,password} = req.body;
    try{
        //checking if user already exists
        const exist = await userModel.findOne({email});
        if(exist){
           return res.status(409).json({
                success:false,
                message:"User Already Exists"
            })
        }

        //validating email formate and strong password
        if(!validator.isEmail(email)){
            return res.json({
                success: false,
                message: "please enter a valid email"
            })
        }
        if(password.length<8){
            return res.json({
                success: false,
                message: "Please enter a strong password"
            })
        }
        //hasing user password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
       const user= await newUser.save()
       const token = createToken(user._id)
        
        res.status(200).json({
            success: true,
            token,
            message:"User created successfully"
        })

    }catch(err){
        console.log(err);
        res.json({
            success:false,
            message: "Something went wrong"
        })
    }

}

export {loginUser, registerUser}