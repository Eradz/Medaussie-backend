import express from "express"
import { authRouter, uploadRouter, postRouter, userRouter } from "./routes"
import { errorHandler } from "./middlewares"
import { db } from "./common/config"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import passport from "passport"
import Session from "express-session";
import cors from "cors"
dotenv.config()
const app = express()
const port = 5000
db()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: [process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://medaussie.vercel.app/"] }))
app.use(Session({
    secret: 'suii',
    resave: false,
    saveUninitialized: false,}))
app.use(passport.authenticate('session'))
app.use(passport.initialize())
passport.serializeUser(function(user, done) {done(null, user);});
passport.deserializeUser(function(user: any, done) {done(null, user);});
app.get("/", (req, res)=>{
    res.status(200).json({message: "Medaussie"})
})
app.get("/login", (req, res)=>{
    res.redirect("https://medaussie.vercel.app/login")
})
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/upload", uploadRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/user", userRouter)






app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})