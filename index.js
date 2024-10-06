import dotenv from "dotenv";
import cors from "cors";
import express from "express"
import { dbConnection } from "./database/dbConnection.js";
import { ErrorMiddleware } from "./middleware/error.js";
import { userRouter } from "./routers/userRouter.js";

dotenv.config();
// console.log(process.env.PORT);
const app=express();
app.use(cors());
app.use(express.json());

dbConnection();

app.use("/api/v1/users",userRouter);
app.use(ErrorMiddleware);
app.listen(process.env.PORT,()=>{
    console.log(`App is listening on the port ${process.env.PORT}`)
})
