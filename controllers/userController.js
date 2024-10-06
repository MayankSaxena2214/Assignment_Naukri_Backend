
import { catchAsyncErrors } from "../middleware/catchAsyncErrors.js";
import { ErrorHandler } from "../middleware/error.js";
import { User } from "../models/userSchema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const register=catchAsyncErrors(async(req,res,next)=>{
    const {firstName,lastName,phone,email,password}=req.body;
    if(!firstName || !phone || !email || !password){
        return next(new ErrorHandler("All fields are required",400));
    }
    let user=await User.findOne({email:email});
    if(user){
        return next(new ErrorHandler("User with this email already exists,Kindly login",400));
    }
    const hashedPassword=await bcrypt.hash(password,8);
    user=await User.create({
        firstName,
        lastName,
        phone,
        email,
        password:hashedPassword,
    })
    return res.status(200).json({
        success:true,
        message:"User Registerd successfully",
        user
    });
})

export const login=catchAsyncErrors(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return next(new ErrorHandler("All fields are required",400));
    }
    let user=await User.findOne({email:email});
    if(!user){
        return next(new ErrorHandler("User with this email does not exists, Kindly register",404));
    }
    const isMatched=await bcrypt.compare(password,user.password);
    if(!isMatched){
        return next(new ErrorHandler("Incorrect Password",400));
    }
    const token=await jwt.sign({id:user._id},process.env.JWT_SECRET);
    return res.status(200).json({
        success:true,
        message:"User logged in successfully",
        user,
        token
    });
})

export const getUser=catchAsyncErrors(async(req,res,next)=>{
    return res.status(200).json({
        success:true,
        user:req.user,
    })
})