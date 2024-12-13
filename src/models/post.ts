import {Schema, model} from "mongoose"
import { postType } from "../common/types"

const postSchema= new Schema<postType>({
    title:{
        type: String,
        required: [true, "Please enter a valid Title"]
    },
    excerpt:{
        type: String,
        required: [true, "Please enter a valid excerpt"]
    },
    slug:{
        type: String,
        required: [true, "Please enter a valid slug"]
    },
    featuredImageUrl:{
        type: String,
        required: [true, "Please upload a valid Featured Image"],
        unique: true
    },
    body:{
        type: String,
        required: [true, "Please enter a valid Body"]
    },
    author:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    type: {
        type: String,
        enum: ["license", "exam"],
        default: "exam"
    }
})

export const Post = model("Post", postSchema)

