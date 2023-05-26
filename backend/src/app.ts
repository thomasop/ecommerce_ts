import bodyParser, { json } from "body-parser"
import express from "express"
import cors from 'cors'


let app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));

app.get("/", (req, res) => {
    res.json('test')
})

export default app