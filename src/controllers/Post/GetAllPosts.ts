import {Response, Request} from "express"
import { AppResponse, setCookies } from "../../common/utils"
import AsyncHandler from "express-async-handler"
import { Post } from "../../models"


export const getAllPostsController = AsyncHandler(async(req: Request, res: Response) =>{
    const {type} = req.query;
    if(!type){
        AppResponse.error(res, "Please provide a type of post to be rendered")
        return
    }
   const posts = await Post.find({type})
   if( !posts || posts.length < 1) {
    AppResponse.error(res, "No posts found")
    return
   }
    AppResponse.success(res, "Posts found", posts)
})