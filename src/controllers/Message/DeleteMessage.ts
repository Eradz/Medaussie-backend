import  AsyncHandler  from 'express-async-handler';
import { Request, Response } from 'express';
import { AppResponse } from '../../common/utils';
import { Message } from '../../models';

export const UpdateMessageController = AsyncHandler(async(req: Request, res: Response ) =>{
    const {type, messageId} = req.query
    const {id} = req.params
    const {message, details}  = req.body

    if(type != "comment" && !(type === "question")){
        AppResponse.error(res, "Please specifiy a valid message type")
        return
    }
    if(typeof(message) === 'string' && message.length < 5){
        AppResponse.error(res, `Please enter a message more than 6 characters ${message.length}`)
        return
    }
    const foundMessage = await Message.findById({id})
    if(!foundMessage){
        AppResponse.error(res, "The message you're trying to reply to no longer exists")
    }
    if(foundMessage && foundMessage.type === "comment"){
        foundMessage.message = message
        foundMessage.save()
        AppResponse.success(res, "Comment updated successfully", foundMessage)
    }
    const newMessage = await Message.findByIdAndUpdate({id},{message, details})
    newMessage?.save()
    AppResponse.success(res, `${type} sent`, {newMessage})
})