import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { Post } from "../../models"

export const getSinglePostController = AsyncHandler(async(req: Request, res: Response) =>{
    const {slug} = req.params
    const {type} = req.query
    if(!type){
        AppResponse.error(res, "Please provide a type of post to be rendered")
        return
    }
    const post = await Post.findOne({slug, type}).select("-_v")
    if(!post){
        AppResponse.error(res, "Post not found")
        return
    }
    AppResponse.success(res, "Post found", post)
})