import {Schema, model} from "mongoose"
import { examType } from "../common/types"

const examSchema= new Schema<examType>({
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
    }
})

export const Exam = model("Exam", examSchema)

