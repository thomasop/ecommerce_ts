import bodyParser, { json } from "body-parser"
import express from "express"
import cors from 'cors'
import connect from "./database/connect.js"
import { userRouter } from "./routes/User.js"
import cookieParser from "cookie-parser"


let app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.use('/user', userRouter)

export default app