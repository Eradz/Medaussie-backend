import express, {Request, Response} from "express"
import { AppResponse } from "../common/utils"
import { createExamPost } from "../controllers/Exam"
import { upload } from "../common/config"

const router = express.Router()


router.get("/", (req: Request, res: Response) =>{
    AppResponse.success(res, "Get All exam post", null)
})
router.get("/:id", (req: Request, res: Response) =>{
    AppResponse.success(res, `Get id:${req.params.id} exam post`, null)
})
router.post("/:id", upload.single('file') , createExamPost)
router.delete("/:id", (req: Request, res: Response) =>{
    AppResponse.success(res, `Delete an exam post by author:${req.params.id}`, null)
})



export {router as postRouter}