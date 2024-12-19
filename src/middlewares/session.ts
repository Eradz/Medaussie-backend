import {Response, Request} from "express"
import { AppResponse } from "../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../models/userModel"
import  Jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config()


export const AdminSessionMiddleWare = AsyncHandler(async (req: Request, res: Response) => {
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

    userRole?.role != "admin" ? AppResponse.error(res, "Unauthorized User") : AppResponse.success(res, "User successfully Authenticated", userRole)
})