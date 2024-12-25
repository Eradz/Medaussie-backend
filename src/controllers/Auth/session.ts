import {Response, Request, NextFunction} from "express"
import { AppResponse } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models/userModel"
import  Jwt  from "jsonwebtoken"
import mongoose from "mongoose"


export const sessionController = AsyncHandler(async (req: Request, res: Response) => {
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
      AppResponse.success(res, "User found successfully", user)
        return
    }
    if(user.id != id){
        AppResponse.error(res, "Unauthorized User")
        return
    }
})