import  AsyncHandler  from 'express-async-handler';
import {Request, Response} from "express"
import { AppResponse } from "../../common/utils"
import { Post } from "../../models"
import { cloudinary } from "../../common/config"

export const updatePostController = AsyncHandler(async(req: Request, res:Response) => {
    const updatedPost = req.body
    const {id} = req.params
    if(!id){
        return AppResponse.error(res, "UnAuthorized Post")
    }
    if(req.file){
        const imageUrl = await cloudinary.v2.uploader.upload(req.file.path, {folder:"Medaussie"})
        const exam = await Post.findByIdAndUpdate(id, {...updatedPost, author: req.id, featuredImageUrl: imageUrl.secure_url}, {new: true})
        return AppResponse.success(res, "Exam Post updated successfully", exam)
    }
    if(!req.file){
        const exam = await Post.findByIdAndUpdate(id, {...updatedPost, author: req.id},  {new: true})
        return AppResponse.success(res, "Exam Post updated successfully", exam)
    }   
})