import {Schema} from "mongoose"

export interface messageType {
    message: string
    details: string
    comments: Schema.Types.ObjectId[]
    authorId: Schema.Types.ObjectId
    type: "comment" | "question"
    timeStamp: {
       createdAt: Date;
       updatedAt: Date;
    }
}