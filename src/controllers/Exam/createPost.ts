import  AsyncHandler  from 'express-async-handler';
import {Request, Response} from "express"
import { AppResponse } from "../../common/utils"
import { Post } from "../../models"
import { cloudinary } from "../../common/config"

export const createExamPost = AsyncHandler(async(req: Request, res:Response) => {
    const {title, excerpt, slug, body, type} = req.body
    const {id} = req.params

    if(!id){
        return AppResponse.error(res, "UnAuthorized Post ")
    }
    if(!req.file){
        return AppResponse.error(res, "Please provide a Featured Image for this post")
    }
    if(!title || !excerpt || !slug ||  !body || !type){
      return AppResponse.error(res, "Please fill All fields")
    }
        const imageUrl = await cloudinary.v2.uploader.upload(req.file.path, {folder:"Medaussie"})
        const exam = Post.create({ title, excerpt, slug, body, featuredImageUrl: imageUrl.secure_url, author: id, type })
        return AppResponse.success(res, "Exam Post created successfully", exam)

   
})