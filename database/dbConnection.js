import mongoose from "mongoose";

export const dbConnection=async()=>{
    await mongoose.connect(process.env.MONGODB_URL,{
        dbName:"NAUKRI_ASSIGNMENT"
    })
    .then(()=>{
        console.log(`Database connected`);
    })
    .catch((err)=>{
        console.log(`Error Occured ${err}`);
    })
}