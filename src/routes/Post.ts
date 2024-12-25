import express, {Request, Response} from "express"
import { AppResponse } from "../common/utils"
import { createPostController, getAllPostsController, updatePostController, deletePostController, getSinglePostController } from "../controllers/Post"
import { upload } from "../common/config"
import { AdminSessionMiddleWare} from "../middlewares"

const router = express.Router()

router.get("/", getAllPostsController)
router.get("/:id", getSinglePostController)
router.post("/", [AdminSessionMiddleWare, upload.single('file')] , createPostController)
router.post("/:id", [AdminSessionMiddleWare, upload.single('file')], updatePostController)
router.delete("/:id", AdminSessionMiddleWare, deletePostController)

export {router as postRouter}