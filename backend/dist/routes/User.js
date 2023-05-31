import express from "express";
import { EmailValidation, Login, Signin } from "../controllers/User.js";
import { body } from "express-validator";
export const userRouter = express.Router();
userRouter.post('/login', body('email').isEmail().withMessage('Email : need to be not empty and valid email').escape(), body('password').matches(/[A-Za-z0-9]+/).withMessage('Password : must have at least one uppercase, lowercase, number and special character').escape(), Login);
userRouter.post('/signin', body('email').isEmail().withMessage('Email : need to be not empty and valid email').escape(), body('firstname').isLength({ min: 2 }).withMessage('Firstname min length to be 2').escape(), body('lastname').isLength({ min: 2 }).withMessage('Lastname min length to be 2').escape(), body('password').matches(/[A-Za-z0-9]+/).withMessage('Password must have at least one uppercase, lowercase, number and special character').escape(), Signin);
userRouter.post('/validation-email', body('token').not().isEmpty(), EmailValidation);
