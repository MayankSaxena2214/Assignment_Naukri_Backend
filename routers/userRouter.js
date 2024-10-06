import express from "express";
import { getUser, login, register } from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/auth.js";


export const userRouter=express.Router();

userRouter.post("/register",register);
userRouter.post("/login",login);
userRouter.get("/getUser",isAuthenticated,getUser);

