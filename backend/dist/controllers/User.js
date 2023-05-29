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
        return res.status(400).json({ errors: errors.array() });
    }
    let email = req.body.email;
    let password = req.body.password;
    const user = yield User.findOne({ where: { email: email } });
    if (user === null) {
        return res.status(400).json({ errors: "Wrong email/password combinaison" });
    }
    else {
        const compare = () => __awaiter(void 0, void 0, void 0, function* () {
            const comp = yield bcrypt.compare(password, user === null || user === void 0 ? void 0 : user.dataValues.password);
            if (comp === false) {
                return res
                    .status(400)
                    .json({ errors: "Wrong email/password combinaison" });
            }
            else {
                let token = jwt.sign({ user: user }, process.env.SECRET_TOKEN);
                let expires = new Date();
                expires.setFullYear(expires.getFullYear() + 1);
                res.cookie("token", token, {
                    expires: expires,
                    secure: false,
                    httpOnly: false,
                    path: "/",
                });
                res.cookie("userId", user.dataValues.id, {
                    expires: expires,
                    secure: false,
                    httpOnly: false,
                    path: "/",
                });
                res.status(200).json({
                    user: {
                        id: user.dataValues.id,
                        email: user.dataValues.email,
                        firstname: user.dataValues.firstname,
                        lastname: user.dataValues.lastname,
                    },
                    token: token,
                });
            }
        });
        compare();
    }
});
const Signin = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array });
    }
    else {
        const hash = () => __awaiter(void 0, void 0, void 0, function* () {
            const crypt = yield bcrypt.hash(req.body.password, 10);
            const userCreate = yield User.create({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                password: req.body.password,
                email: req.body.email,
                status: false,
            });
            if (userCreate === null) {
                return res.status(400).json({ errors: "Can't register user" });
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
                    text: "That was easy!",
                };
                smtpTransport.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return res.status(400).json({ message: "Email not send" });
                    }
                    else {
                        res.status(200).json({ result: userCreate });
                    }
                });
            }
        });
        hash();
    }
};
export { Login, Signin };
