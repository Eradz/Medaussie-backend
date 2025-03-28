import  AsyncHandler  from 'express-async-handler';
import { Request, Response } from 'express';
import { AppResponse } from '../../common/utils';
import { Message } from '../../models';
import mongoose from 'mongoose';

export const DeleteMessageController = AsyncHandler(async(req: Request, res: Response ) =>{
    const {type} = req.query
    const {id} = req.params

    if(type != "comment" && !(type === "question")){
        AppResponse.error(res, "Please specifiy a valid message type")
        return
    }
    const foundMessage = await Message.findById(id)
    if(!foundMessage){
        return AppResponse.error(res, "The message you're trying to reply to no longer exists")
    }
    if(foundMessage.authorId instanceof mongoose.Types.ObjectId && foundMessage.authorId.equals(req.id)){
        const commentsQuestion = await Message.find({comment: `${foundMessage._id}`})
        // commentsQuestion?.comments.pull
        // await foundMessage.deleteOne()
        console.log(foundMessage, commentsQuestion)
        await foundMessage.save()
        return AppResponse.success(res, `${type} successfully deleted`, {foundMessage})
    }
    return AppResponse.error(res, "Unable to delete Message")
})