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
    const message = await Message.findOne({type: "question", _id: id})
    .populate({path:"comments", select:"-type -comments", 
        populate: {
        path: 'authorId',
        model: "User",
        select: "firstname _id"
      }})
      .populate({path: "authorId", model: "User", select: "firstname _id"}).select("-type")
    if(!message || message === null){
        AppResponse.error(res, "No message found")
    }
   AppResponse.success(res, "Questions Found", message)
})