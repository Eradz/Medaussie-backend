import {Response, Request} from "express"
import { AppResponse } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models/userModel"
import  Jwt  from "jsonwebtoken"


export const sessionController = AsyncHandler(async (req: Request, res: Response) => {
    const {access_token} = req.cookies
    if (!access_token) {
        AppResponse.error(res, "Access token is required")
    }
        const userId = await Jwt.decode(access_token)
    if(!userId) {   
        AppResponse.error(res, "Invalid access token")
    }
    const user = await User.findById(userId).select("firstname lastname email")
    AppResponse.success(res, "User successfully Authenticated", user)
})