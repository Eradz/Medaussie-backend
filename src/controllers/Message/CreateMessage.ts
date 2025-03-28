import  AsyncHandler  from 'express-async-handler';
import { Request, Response } from 'express';
import { AppResponse } from '../../common/utils';
import { Message } from '../../models';

export const createMessageController = AsyncHandler(async(req: Request, res: Response ) =>{
    const {type, messageId} = req.query
    const {message, details}  = req.body

    if(type != "comment" && !(type === "question")){
        AppResponse.error(res, "Please specifiy a valid message type")
        return
    }
    if(typeof(message) === 'string' && message.length < 5){
        AppResponse.error(res, `Please enter a message more than 6 characters ${message.length}`)
        return
    }
    if(type === "comment"){
        const comment = await Message.create({type, message, authorId: req.id})
        const oldMessage = await Message.findById(messageId)
        if(oldMessage){
            oldMessage.comments.push(comment.id)
            await oldMessage.save()  
            AppResponse.success(res, `${type} sent`, {oldMessage})
            return
        }
        AppResponse.error(res, `Please select a valid message to make a reply`)
        return
    }
    if(!details){
        AppResponse.error(res, `Please enter more details to your question`)
        return
    }
    const newMessage = await Message.create({type, message, details, authorId: req.id})
    newMessage.save()
    AppResponse.success(res, `${type} sent`, {newMessage})
})