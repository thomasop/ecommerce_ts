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
export { Login };
