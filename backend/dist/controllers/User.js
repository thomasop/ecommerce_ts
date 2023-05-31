var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { validationResult } from "express-validator";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
dotenv.config();
const Login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            result: {
                status: 400,
                errorsBody: errors,
                error: "",
            },
        });
    }
    let email = req.body.email;
    let password = req.body.password;
    const user = yield User.findOne({ where: { email: email } });
    if (user === null) {
        return res.status(404).json({
            result: {
                status: 404,
                error: "Wrong email/password combinaison",
            },
        });
    }
    else {
        const compare = () => __awaiter(void 0, void 0, void 0, function* () {
            const comp = yield bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.dataValues.password);
            if (comp === false) {
                return res.status(404).json({
                    result: {
                        status: 404,
                        error: "Wrong email/password combinaison",
                    },
                });
            }
            else {
                let token = jwt.sign({ user: user }, process.env.SECRET_TOKEN);
                res.status(200).json({
                    result: {
                        status: 200,
                        user: {
                            id: user.dataValues.id,
                            email: user.dataValues.email,
                            firstname: user.dataValues.firstname,
                            lastname: user.dataValues.lastname,
                        },
                        token: token,
                        error: "",
                    },
                });
            }
        });
        compare();
    }
});
const Signin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            result: {
                status: 400,
                errorsBody: errors,
                error: "",
            },
        });
    }
    else {
        const hash = () => __awaiter(void 0, void 0, void 0, function* () {
            const crypt = yield bcrypt.hash(req.body.password, 10);
            let token = jwt.sign({ user: req.body.email }, process.env.SECRET_TOKEN_REGISTER);
            const userCreate = yield User.create({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                password: crypt,
                email: req.body.email,
                status: false,
                token: token,
            });
            if (userCreate === null) {
                return res.status(400).json({
                    result: {
                        status: 404,
                        error: "Can't register user, please try again",
                    },
                });
            }
            else {
                let smtpTransport = nodemailer.createTransport({
                    service: "Gmail",
                    auth: {
                        user: process.env.SECRET_SMTP_EMAIL,
                        pass: process.env.SECRET_SMTP_PASSWORD,
                    },
                });
                let mailOptions = {
                    from: process.env.SECRET_SMTP_EMAIL,
                    to: process.env.SECRET_SMTP_EMAIL,
                    subject: "Validation of your account",
                    html: `<div><h1>Ecommerce site</h1><p>Click on the link for validate your account</p><p>This link is available one day</p><a href='http://localhost:3000/email-validation/${token}'>Click here</a></div>`,
                };
                smtpTransport.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log("succes");
                    }
                });
                res.status(200).json({
                    result: {
                        status: 200,
                        error: "",
                    },
                });
            }
        });
        hash();
    }
};
const EmailValidation = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            result: {
                status: 400,
                errorsBody: errors,
                error: "",
            },
        });
    }
    let token = req.body.token;
    const decode = jwt.decode(token);
    if (decode) {
        let email = decode.user;
        let user = yield User.findOne({ where: { email: email } });
        if (user === null) {
            return res.status(404).json({ status: 404, message: "User is not found, please try again" });
        }
        else {
            if (user.dataValues.status === false) {
                let editUser = yield User.update({ status: true, token: null }, { where: { id: user.dataValues.id } });
                if (editUser[0] === 0) {
                    return res
                        .status(404)
                        .json({ status: 404, message: "User is not edit, please try again" });
                }
                else {
                    res.status(200).json({ status: 200, message: "Your account is ready, you can login in !" });
                }
            }
            else {
                res
                    .status(200)
                    .json({ status: 200, message: "Button is already clicked, you can login in your account !" });
            }
        }
    }
    else {
        return res.status(404).json({ status: 404, message: "Token is not found, please try again" });
    }
});
export { Login, Signin, EmailValidation };
