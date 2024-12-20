import  mongoose  from 'mongoose';
import {Response, Request, NextFunction} from "express"
import { AppResponse } from "../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../models/userModel"
import  Jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const AdminSessionMiddleWare = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {access_token} = req?.cookies
    if (!access_token || access_token === undefined) {
        AppResponse.error(res, "Access token is required")
    }
    interface JwtPayload {
        userId: string;
        exp: number;
        iat: number;
    }
    
        const decoded = Jwt.verify(access_token, process.env.JWT_SECRET ? process.env.JWT_SECRET : "") as JwtPayload
        const userId = decoded.userId
        
    if(!userId) {   
        AppResponse.error(res, "Invalid access token")
    }
    const userRole = await User.findById(userId).select("role")

    userRole?.role != "admin" ? AppResponse.error(res, "Unauthorized User") : next()
})

export const UserSessionMiddleWare = AsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const {access_token} = req?.cookies
    const {id} = req.params
    if (!access_token || access_token === undefined) {
        AppResponse.error(res, "Access token is required")
    }
    if ( id && mongoose.Types.ObjectId.isValid(id) === false) {
        return AppResponse.error(res, "Invalid ID");
    }
    interface JwtPayload {
        userId: string;
        exp: number;
        iat: number;
    }
    
        const decoded = Jwt.verify(access_token, process.env.JWT_SECRET ? process.env.JWT_SECRET : "") as JwtPayload
        const userId = decoded.userId
        
    if(!userId) {   
        AppResponse.error(res, "Invalid access token")
    }
    const user = await User.findById(userId).select("role _id")

    if(!user ) {return AppResponse.error(res, "Unauthorized User")}
    if(user.role === "admin" || userId === id){
        next()
        return
    }
    if(user.id != id){
        AppResponse.error(res, "Unauthorized User")
        return
    }
})
