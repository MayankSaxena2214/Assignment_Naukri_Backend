import { ErrorHandler } from "./error.js";

export const catchAsyncErrors=(theFunction)=>{
    return async(req,res,next)=>{
        try{
           await theFunction(req,res,next);
        }
        catch(err){
            next(new ErrorHandler(err.message,err.statusCode || 500));
        }
    }
}