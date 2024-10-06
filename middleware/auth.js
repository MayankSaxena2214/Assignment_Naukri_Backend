import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import { ErrorHandler } from "./error.js";
import jwt from "jsonwebtoken"
export const isAuthenticated=catchAsyncErrors(async(req,res,next)=>{
    const {token}=req.headers;
    if(!token){
        return next(new ErrorHandler("User not authenticated",400));
    }
    const decodedToken=await jwt.verify(token,process.env.JWT_SECRET);
    let user=await User.findOne({_id:decodedToken.id});
    req.user=user;
    next();
})