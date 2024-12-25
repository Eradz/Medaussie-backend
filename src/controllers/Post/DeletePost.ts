import  AsyncHandler  from 'express-async-handler';
import {Request, Response} from "express"
import { AppResponse } from "../../common/utils"
import { Post } from "../../models"


export const deletePostController = AsyncHandler(async(req: Request, res:Response) => {
    const {id} = req.params
    if(!id){
        return AppResponse.error(res, "Please select a paricular post")
    }
        const deletedPost = await Post.findByIdAndDelete(id)
        return AppResponse.success(res, "Exam Post Deleted successfully", deletedPost) 
})