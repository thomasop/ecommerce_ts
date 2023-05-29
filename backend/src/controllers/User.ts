import { Request, Response } from "express";
import { ExpressValidator, validationResult } from "express-validator";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();
const Login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let email = req.body.email;
  let password = req.body.password;
  const user = await User.findOne({ where: { email: email } });
  if (user === null) {
    return res.status(400).json({ errors: "Wrong email/password combinaison" });
  } else {
    const compare = async () => {
      const comp = await bcrypt.compare(password, user?.dataValues.password);
      if (comp === false) {
        return res
          .status(400)
          .json({ errors: "Wrong email/password combinaison" });
      } else {
        let token = jwt.sign(
          { user: user },
          process.env.SECRET_TOKEN as string
        );
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
    };
    compare();
  }
};

export { Login };
