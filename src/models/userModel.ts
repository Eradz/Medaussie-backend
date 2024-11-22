import {Schema, model} from "mongoose"
import { userType } from "../common/types"

const userSchema= new Schema<userType>({
    googleId:{
        type: String
    },
    firstname:{
        type: String,
        required: [true, "Please enter a valid First Name"]
    },
    lastname:{
        type: String,
        required: [true, "Please enter a valid Last Name"]
    },
    email:{
        type: String,
        required: [true, "Please enter a valid Email"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "Please enter a valid Password"]
    },
    role:{
        type: String,
        default: "user"
    }
})

export const User = model("User", userSchema)

