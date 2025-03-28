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
    const messages = await Message.find({type: "question", _id: id}).select("-type").populate('comments').select('-type')
    if(messages.length === 0){
        AppResponse.error(res, "No messages found")
    }
   AppResponse.success(res, "Questions Found", messages)
})