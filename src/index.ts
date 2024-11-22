import express from "express"
import { authRouter } from "./routes"
import { errorHandler } from "./middlewares"
import { db } from "./common/config"
import dotenv from 'dotenv'

dotenv.config()
const app = express()
const port = 5000
db()
app.use(express.json())
app.get("/", (req, res)=>{
    res.send("welcome")
})
app.use("/api/v1/users", authRouter)






app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})