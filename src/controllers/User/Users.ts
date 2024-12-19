import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { User } from "../../models/userModel"

export const getAllUsersController = AsyncHandler(async(req: Request, res: Response) =>{
   const users = await User.find()
   if( !users || users.length < 1) {
    AppResponse.error(res, "No users found")
    return
   }
    AppResponse.success(res, "Users found", users)
})

export const getUserByIdController = async(req: Request, res: Response) =>{
    const {id} = req.params
    if(!id){
        AppResponse.error(res, "Please provide an id")
        return
    }
    const user = await User.findById(id)
    if(!user){
        AppResponse.error(res, "User not found")
        return
    }
    AppResponse.success(res, "User found", user)
}

export const updateUserController = async(req: Request, res: Response) =>{
    const {id} = req.params
    const {updatedUserData} = req.body
    if(!id){
        AppResponse.error(res, "Please provide an id")
        return
    }
    const user = await User.findByIdAndUpdate(id, updatedUserData, {new: true})
    if(!user){
        AppResponse.error(res, "User not found")
        return
    }
    AppResponse.success(res, "User updated successfully", user)
}