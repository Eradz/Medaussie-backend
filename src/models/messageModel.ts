import {Schema, model} from "mongoose"
import { messageType } from "../common/types"


const messageSchema= new Schema<messageType>({
    message:{
        type: String,
        required: [true, "Please enter a valid message"]
    },
    details:{
        type: String
    },
    comments:{
        type: [Schema.Types.ObjectId],
        ref: "Message",
    },
    authorId:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ["comment", "question"],
        default: "question"
    }    
},{timestamps: true})

export const Message = model("Message", messageSchema)

