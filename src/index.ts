import express from "express"
import { authRouter, uploadRouter, postRouter, userRouter } from "./routes"
import { errorHandler } from "./middlewares"
import { db } from "./common/config"
import cookieParser from "cookie-parser"
import dotenv from 'dotenv'
import passport from "passport"
import Session from "express-session";
import cors from "cors"
import http from "http"
dotenv.config()
const app = express()
const port = 5000
db()
app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: ["http://localhost:3000", `${process.env.FRONTEND_URL}`] }))
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
    res.redirect(`${process.env.FRONTEND_URL}/login`)
})
app.get('/logout', (req, res) => {
    res.cookie('access_token', '', { maxAge: 0 });
    res.redirect("/login")
  });
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/upload", uploadRouter)
app.use("/api/v1/post", postRouter)
app.use("/api/v1/user", userRouter)

const server = http.createServer({}, app)


app.use(errorHandler)
server.listen(port, ()=>{
    console.log(`Server running on ${port}`)
})
server.keepAliveTimeout = (60 * 1000) + 1000;
server.headersTimeout = (60 * 1000) + 2000;