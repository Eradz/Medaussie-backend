import {Schema} from "mongoose"

export interface examType {
    title: string
    body: string
    excerpt: string
    slug: string
    featuredImageUrl: string
    author: Schema.Types.ObjectId
}