import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models/userModel"
import bcrypt from "bcryptjs"


export const getAllUsersController = AsyncHandler(async(req: Request, res: Response) =>{
   const users = await User.find()
   if( !users || users.length < 1) {
    AppResponse.error(res, "No users found")
    return
   }
    AppResponse.success(res, "Users found", users)
})

export const getUserByIdController = AsyncHandler(async(req: Request, res: Response) =>{
    const {id} = req.params
    const user = await User.findById(id)
    if(!user){
        AppResponse.error(res, "User not found")
        return
    }
    AppResponse.success(res, "User found", user)
})

export const updateUserController = AsyncHandler(async(req: Request, res: Response) =>{
    const {id} = req.params
    const updatedUserData = req.body
    if(!id){
        AppResponse.error(res, "Please provide an id")
        return
    }
    if(Object.keys(updatedUserData).includes("email")){
        AppResponse.error(res, "Email address can not be changed")
        return
    }
    if(Object.keys(updatedUserData).includes("password")){
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10)
    }
    const user = await User.findById(id)
    if(!user) {
        AppResponse.error(res, "User not found")
        return
    }
    if (Object.keys(updatedUserData).includes("role") && user.id != "admin"){
        AppResponse.error(res, "Only Admins can update role")
        return
    }
    const finalUser = await User.findByIdAndUpdate(id, updatedUserData, {new: true})
    AppResponse.success(res, "User updated successfully", finalUser)
})