import  AsyncHandler  from 'express-async-handler';
import { Request, Response } from 'express';
import { AppResponse } from '../../common/utils';
import { Message } from '../../models';

export const GetSingleMessagesController = AsyncHandler(async(req: Request, res: Response ) =>{
    const {type} = req.query
    const {id} = req.params
    
    if(type != "comment" && !(type === "question")){
        AppResponse.error(res, "Please specifiy a valid message type")
        return
    }
    const message = await Message.findOne({type: "question", _id: id}).select("-type").populate({path:"comments"}).populate("authorId").select('-type')
    if(!message || message === null){
        AppResponse.error(res, "No message found")
    }
   await message?.populate(["comments", "authorId"])
   console.log(message?.populated("authorId"))
   AppResponse.success(res, "Questions Found", message)
})