import { v2 } from 'cloudinary';
import {cloudinary} from "../../common/config"
import { Request, Response } from "express"
import { AppResponse } from "../../common/utils"


export const uploadImage = async(req: Request, res: Response) =>{
  if(!req.file){
    AppResponse.error(res, "No file uploaded")
    return
  }
    const result = await cloudinary.v2.uploader.upload(req.file.path,{folder:"Medaussie"})
    result ? AppResponse.success(res, 'File Upload Successful', result.secure_url) : AppResponse.error(res, "Error uploading file")
}

