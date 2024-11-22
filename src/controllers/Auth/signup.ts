import {Response, Request} from "express"
import { AppResponse } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models/userModel"
import bcrypt from "bcryptjs"
import { userType } from "../../common/types"

export const signupController = AsyncHandler(async(req: Request, res: Response) =>{
   const {firstname, lastname, password, email} : userType = req.body
   if(!firstname || !lastname || !password || !email){
      AppResponse.error(res, "Please fill all required fields")
   }
   // Perform signup logic here 
   const user = await User.findOne({ email})
   if(user){
      AppResponse.error(res, "User already exists")
   }
   const hashedPassword = await bcrypt.hash(password, 10)
   const newUser = new User({firstname, lastname, password: hashedPassword, email})
   newUser.save()
   AppResponse.success(res, "Signup successful", null)
})