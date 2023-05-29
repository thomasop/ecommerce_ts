import express from "express";
import { Login } from "../controllers/User.js";
import { body } from "express-validator";
export const userRouter = express.Router();
userRouter.post('/login', body('email').isEmail().withMessage('Email need to be not empty and valid email').escape(), body('password').matches(/[A-Za-z0-9]+/).withMessage('Password must have at least one uppercase, lowercase, number and special character').escape(), Login);
