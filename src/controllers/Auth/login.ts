import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models/userModel"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { userType } from "../../common/types"

export const loginController = AsyncHandler(async(req: Request, res: Response) =>{
   const { password, email} = req.body
   if(!password || !email){
      AppResponse.error(res, "Please fill all required fields")
   }
   // Perform login logic here 
   const user = await User.findOne({email})
   if(!user){
      AppResponse.error(res, "Invalid Email or Password")
   }
   if(user !== null && await bcrypt.compare(password, user.password)){
        const accessToken = await jwt.sign({userId: user._id, date: Date.now()}, process.env.JWT_SECRET || "", {expiresIn: "7d"})
        setCookies(res, "access_token", accessToken)
      AppResponse.success(res, `Login successful, Welcome ${user.firstname}`, {role: user.role, id: user._id})
   }else{
       AppResponse.error(res, "Invalid Email or Password")
   }
})