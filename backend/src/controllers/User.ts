import { Request, Response } from "express";
import { ExpressValidator, validationResult } from "express-validator";
import User from "../model/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

dotenv.config();

const Login = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  console.log(errors);
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
  const user = await User.findOne({ where: { email: email } });
  if (user === null) {
    return res.status(404).json({
      result: {
        status: 404,
        error: "Wrong email/password combinaison",
      },
    });
  } else {
    const compare = async () => {
      const comp = await bcrypt.compare(password, user?.dataValues.password);
      if (comp === false) {
        return res.status(404).json({
          result: {
            status: 404,
            error: "Wrong email/password combinaison",
          },
        });
      } else {
        let token = jwt.sign(
          { user: user },
          process.env.SECRET_TOKEN as string
        );

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
    };
    compare();
  }
};

const Signin = (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ 
      result: {
        status: 400,
        errorsBody: errors,
        error: "",
      },
     });
  } else {
    const hash = async () => {
      const crypt = await bcrypt.hash(req.body.password, 10);
      const userCreate = await User.create({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        password: crypt,
        email: req.body.email,
        status: false,
      });
      if (userCreate === null) {
        return res.status(400).json({ 
          result: {
            status: 404,
            error: "Can't register user, please try again",
          },
          
           });
      } else {
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
            console.log(error);
          } else {
            console.log('succes');
          }
        });
        res.status(200).json({
          result: {
            status: 200,
            error: "",
          },
        });
      }
    };
    hash();
  }
};

export { Login, Signin };
