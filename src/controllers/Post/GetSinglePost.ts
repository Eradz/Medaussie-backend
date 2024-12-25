import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { Post } from "../../models"

export const getSinglePostController = AsyncHandler(async(req: Request, res: Response) =>{
    const {id} = req.params
    const user = await Post.findById(id).select("-_v")
    if(!user){
        AppResponse.error(res, "Post not found")
        return
    }
    AppResponse.success(res, "Post found", user)
})