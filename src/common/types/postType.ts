import {Schema} from "mongoose"

export interface postType {
    title: string
    body: string
    excerpt: string
    slug: string
    featuredImageUrl: string
    type: "license" | "exam"
    author: Schema.Types.ObjectId
}